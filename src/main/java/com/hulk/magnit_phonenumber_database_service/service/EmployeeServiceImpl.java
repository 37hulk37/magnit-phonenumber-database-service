package com.hulk.magnit_phonenumber_database_service.service;

import com.hulk.magnit_phonenumber_database_service.dao.EmployeeRepository;
import com.hulk.magnit_phonenumber_database_service.entity.Employee;
import com.hulk.magnit_phonenumber_database_service.exception.EmployeeNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;
    private static final Logger log = LoggerFactory.getLogger(EmployeeServiceImpl.class);

    @Override
    public void saveEmployee(Employee employee) {
        log.info("Saving employee with username: " + employee.getUsername());
        employeeRepository.save(employee);
    }

    @Override
    public Page<Employee> getEmployees(int offset, int limit, EmployeeSort sort) {
        log.info("Getting employees with offset = " + offset +
                ", limit = " + limit + ", sort = " + sort.toString());
        return employeeRepository.findAll(PageRequest.of(offset, limit, sort.getSortValue()));
    }

    @Override
    public Employee getEmployee(UUID id) {
        log.info("Getting employee with id: " + id);
        return employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Failed to get employee with id: " + id));
    }

    @Override
    public void deleteEmployee(UUID id) {
        log.info("Deleting employee with id: " + id);
        employeeRepository.deleteById(id);
    }

    @Override
    public Optional<Employee> findByEmail(String email) {
        log.debug("Finding employee with email: " + email);
        return employeeRepository.findByEmail(email);
    }

    @Override
    public boolean existsUserByEmail(String email) {
        boolean doesUserExists = employeeRepository.existsUserByEmail(email);
        if (doesUserExists) {
            log.debug("User exists with email: " + email);
        } else {
            log.debug("User does not exist with email: " + email);
        }
        return employeeRepository.existsUserByEmail(email);
    }
}
