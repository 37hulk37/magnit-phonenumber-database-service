package com.hulk.magnit_phonenumber_database_service.dao;

import com.hulk.magnit_phonenumber_database_service.auth.UpdateRequest;
import com.hulk.magnit_phonenumber_database_service.entity.Employee;
import com.hulk.magnit_phonenumber_database_service.auth.SearchRequest;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Repository
public class EmployeeCriteriaRepository {
    private final CriteriaBuilder criteriaBuilder;
    private final EntityManager entityManager;
    private static final Logger log = LoggerFactory.getLogger(EmployeeCriteriaRepository.class);

    public EmployeeCriteriaRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
        this.criteriaBuilder = entityManager.getCriteriaBuilder();
    }

    public Page<Employee> findAllWithFilters(Pageable employeePageable, SearchRequest searchCriteria) {
        CriteriaQuery<Employee> criteriaQuery = criteriaBuilder.createQuery(Employee.class);
        Root<Employee> employeeRoot = criteriaQuery.from(Employee.class);
        Predicate predicate = getPredicate(searchCriteria, employeeRoot);

        criteriaQuery.where(predicate);

        log.debug("Executing search query");

        TypedQuery<Employee> typedQuery = entityManager.createQuery(criteriaQuery);
        typedQuery.setFirstResult(employeePageable.getPageNumber() * employeePageable.getPageSize());
        typedQuery.setMaxResults(employeePageable.getPageSize());

        List<Employee> employees = typedQuery.getResultList();

        Pageable pageable = PageRequest.of(employeePageable.getPageNumber(), employeePageable.getPageSize());

        return new PageImpl<>(employees, pageable, employees.size());
    }

    private Predicate getPredicate(SearchRequest searchCriteria,
                                   Root<Employee> employeeRoot) {
        log.debug("Build predicate");

        List<Predicate> predicates = new ArrayList<>();

        addCriteriaToQuery(searchCriteria.getName(), "name", employeeRoot, predicates);
        addCriteriaToQuery(searchCriteria.getSurname(), "surname", employeeRoot, predicates);
        addCriteriaToQuery(searchCriteria.getBossId(), "bossId", employeeRoot, predicates);
        addCriteriaToQuery(searchCriteria.getDepartment(), "department", employeeRoot, predicates);
        addCriteriaToQuery(searchCriteria.getPhonenumber(), "phonenumber", employeeRoot, predicates);

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }

    private <T> void addCriteriaToQuery(T criteria, String str, Root<Employee> employeeRoot, List<Predicate> predicates) {
        log.debug("Add criteria to query");

        if (Objects.nonNull(criteria)) {
            predicates.add(
                    criteriaBuilder.like(employeeRoot.get(str), "%" + criteria + "%")
            );
        }
    }

    @Transactional
    public int updateEmployee(UpdateRequest updateRequest) {
        CriteriaUpdate<Employee> criteriaUpdate = criteriaBuilder.createCriteriaUpdate(Employee.class);
        Root<Employee> employeeRoot = criteriaUpdate.from(Employee.class);

        Pattern passwordPattern = Pattern.compile("^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){6,16}$");
        Matcher passwordMatcher = passwordPattern.matcher(updateRequest.getState());

        boolean stateIsValid = false;
        if (passwordMatcher.matches()) {
            stateIsValid = true;

            criteriaUpdate.set("password", updateRequest.getState());
        }

        Pattern phonenumberPattern = Pattern.compile("^(\\+?[78]{1,1}([0-9]{10,10}))$");
        Matcher phonenumberMatcher = phonenumberPattern.matcher(updateRequest.getState());

        if (phonenumberMatcher.matches()) {
            stateIsValid = true;

            criteriaUpdate.set("phonenumber", updateRequest.getState());
        }

        if ( !stateIsValid ) {
            return -1;
        }
        criteriaUpdate.where(criteriaBuilder.equal(employeeRoot.get("id"), updateRequest.getId()));

        Query query= entityManager.createQuery(criteriaUpdate);
        entityManager.joinTransaction();

        return query.executeUpdate();
    }
}
