package com.hulk.magnit_phonenumber_database_service.service;

import com.hulk.magnit_phonenumber_database_service.entity.Employee;
import com.hulk.magnit_phonenumber_database_service.dto.EmployeeDTO;
import com.hulk.magnit_phonenumber_database_service.entity.EmployeeSearchCriteria;
import org.springframework.data.domain.Page;

import java.util.Optional;
import java.util.UUID;

public interface EmployeeService {
    public void saveEmployee(Employee employee);

    public Page<EmployeeDTO> getEmployeesWithFilters(int offset, int limit, EmployeeSort sort, EmployeeSearchCriteria searchCriteria);

    public Page<EmployeeDTO> getEmployees(int offset, int limit, EmployeeSort sort);

    public Employee getEmployee(UUID id);

    public void deleteEmployee(UUID id);

    Optional<Employee> findByEmail(String email);

    public boolean existsUserByEmail(String email);
}
