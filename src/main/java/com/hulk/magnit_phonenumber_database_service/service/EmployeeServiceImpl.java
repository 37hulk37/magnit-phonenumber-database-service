package com.hulk.magnit_phonenumber_database_service.service;

import com.hulk.magnit_phonenumber_database_service.dao.EmployeeRepository;
import com.hulk.magnit_phonenumber_database_service.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public void saveEmployee(Employee employee) {
        employeeRepository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee getEmployee(UUID id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("There is no user with this id"));
    }

    @Override
    public void deleteEmployee(UUID id) {
        employeeRepository.deleteById(id);
    }

    @Override
    public Optional<Employee> findByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }

    @Override
    public boolean existsUserByEmail(String email) {
        return employeeRepository.existsUserByEmail(email);
    }
}
