package com.hulk.magnit_phonenumber_database_service.service;

import com.hulk.magnit_phonenumber_database_service.entity.Employee;
import com.hulk.magnit_phonenumber_database_service.dto.EmployeeDTO;
import com.hulk.magnit_phonenumber_database_service.entity.EmployeeSearchCriteria;
import org.springframework.data.domain.Page;
import org.springframework.scheduling.annotation.Async;

import java.util.Optional;
import java.util.UUID;

public interface EmployeeService {
    @Async
    void saveEmployee(Employee employee);

    Page<EmployeeDTO> getEmployeesWithFilters(int offset, int limit, EmployeeSort sort, EmployeeSearchCriteria searchCriteria);

    Page<EmployeeDTO> getEmployees(int offset, int limit, EmployeeSort sort);

    Employee getEmployee(UUID id);

    @Async
    void deleteEmployee(UUID id);

    Optional<Employee> findByEmail(String email);

    boolean existsUserByEmail(String email);
}
