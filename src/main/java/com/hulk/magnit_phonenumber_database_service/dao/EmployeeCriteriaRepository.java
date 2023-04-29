package com.hulk.magnit_phonenumber_database_service.dao;

import com.hulk.magnit_phonenumber_database_service.entity.Employee;
import com.hulk.magnit_phonenumber_database_service.entity.EmployeeSearchCriteria;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Repository
public class EmployeeCriteriaRepository {
    private final CriteriaBuilder criteriaBuilder;
    private final EntityManager entityManager;

    public EmployeeCriteriaRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
        this.criteriaBuilder = entityManager.getCriteriaBuilder();
    }

    public Page<Employee> findAllWithFilters(EmployeeSearchCriteria searchCriteria) {
        CriteriaQuery<Employee> criteriaQuery = criteriaBuilder.createQuery(Employee.class);
        Root<Employee> employeeRoot = criteriaQuery.from(Employee.class);
        Predicate predicate = getPredicate(searchCriteria, employeeRoot);

        criteriaQuery.where(predicate);

        TypedQuery<Employee> typedQuery = entityManager.createQuery(criteriaQuery);

        return new PageImpl<>(typedQuery.getResultList());
    }

    private Predicate getPredicate(EmployeeSearchCriteria searchCriteria,
                                   Root<Employee> employeeRoot) {
        List<Predicate> predicates = new ArrayList<>();

        addCriteriaToQuery(searchCriteria.getName(), "name", employeeRoot, predicates);
        addCriteriaToQuery(searchCriteria.getSurname(), "surname", employeeRoot, predicates);
        addCriteriaToQuery(searchCriteria.getBossId(), "bossId", employeeRoot, predicates);
        addCriteriaToQuery(searchCriteria.getDepartment(), "department", employeeRoot, predicates);
        addCriteriaToQuery(searchCriteria.getPhonenumber(), "phonenumber", employeeRoot, predicates);

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }

    private <T> void addCriteriaToQuery(T criteria, String str, Root<Employee> employeeRoot, List<Predicate> predicates) {
        if (Objects.nonNull(criteria)) {
            predicates.add(
                    criteriaBuilder.like(employeeRoot.get(str), "%" + criteria + "%")
            );
        }
    }
}
