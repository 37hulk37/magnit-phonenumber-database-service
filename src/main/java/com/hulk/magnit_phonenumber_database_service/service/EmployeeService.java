package com.hulk.magnit_phonenumber_database_service.service;

import com.hulk.magnit_phonenumber_database_service.entity.Employee;
import org.springframework.data.domain.Page;

import java.util.Optional;
import java.util.UUID;

public interface EmployeeService {
    void saveEmployee(Employee employee);

    Page<Employee> getEmployees(int offset, int limit, EmployeeSort sort);

    Employee getEmployee(UUID id);

    void deleteEmployee(UUID id);

    Optional<Employee> findByEmail(String email);

    boolean existsUserByEmail(String email);
}
