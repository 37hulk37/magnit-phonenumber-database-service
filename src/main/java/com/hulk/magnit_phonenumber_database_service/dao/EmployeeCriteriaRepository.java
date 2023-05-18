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

    public Page<Employee> findAllWithFilters(Pageable employeePage, SearchRequest searchRequest) {
        CriteriaQuery<Employee> searchQuery = criteriaBuilder.createQuery(Employee.class);
        Root<Employee> employeeRoot = searchQuery.from(Employee.class);
        Predicate predicateEmployees = getPredicate(searchRequest, employeeRoot);

        searchQuery.where(predicateEmployees);

        TypedQuery<Employee> typedQuery = entityManager.createQuery(searchQuery);
        typedQuery.setFirstResult(employeePage.getPageNumber() * employeePage.getPageSize());
        typedQuery.setMaxResults(employeePage.getPageSize());
        List<Employee> employees = typedQuery.getResultList();

        Pageable pageable = PageRequest.of(employeePage.getPageNumber(), employeePage.getPageSize());

        long count = getEmployeesCount(searchRequest);

        return new PageImpl<>(employees, pageable, count);
    }

    private Predicate getPredicate(SearchRequest searchRequest,
                                   Root<Employee> employeeRoot) {
        log.debug("Build predicate");

        List<Predicate> predicates = new ArrayList<>();

        addCriteriaToQuery(searchRequest.getName(), "name", employeeRoot, predicates);
        addCriteriaToQuery(searchRequest.getSurname(), "surname", employeeRoot, predicates);
        addCriteriaToQuery(searchRequest.getBossId(), "bossId", employeeRoot, predicates);
        addCriteriaToQuery(searchRequest.getDepartment(), "department", employeeRoot, predicates);
        addCriteriaToQuery(searchRequest.getPhonenumber(), "phonenumber", employeeRoot, predicates);

        return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
    }

    private <T> void addCriteriaToQuery(T criteria, String str, Root<Employee> employeeRoot, List<Predicate> predicates) {
        log.debug("Add criteria to query");

        if (Objects.nonNull(criteria)) {
            predicates.add(
                    criteriaBuilder.equal(employeeRoot.get(str), criteria)
            );
        }
    }

    private long getEmployeesCount(SearchRequest searchRequest) {
        CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
        Root<Employee> root = countQuery.from(Employee.class);

        Predicate predicateSearch = getPredicate(searchRequest, root);

        countQuery.select(criteriaBuilder.count(root)).where(predicateSearch);

        return entityManager.createQuery(countQuery).getSingleResult();
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
