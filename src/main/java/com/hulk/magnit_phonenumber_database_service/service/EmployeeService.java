package com.hulk.magnit_phonenumber_database_service.service;

import com.hulk.magnit_phonenumber_database_service.entity.Employee;

import java.util.List;
import java.util.UUID;

public interface EmployeeService {
    public void saveEmployee(Employee employee);

    public List<Employee> getAllEmployees();

    public Employee getEmployee(UUID id);

    public void deleteEmployee(UUID id);
}
