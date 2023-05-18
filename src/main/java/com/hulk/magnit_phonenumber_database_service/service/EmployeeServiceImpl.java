package com.hulk.magnit_phonenumber_database_service.service;

import com.hulk.magnit_phonenumber_database_service.auth.UpdateRequest;
import com.hulk.magnit_phonenumber_database_service.dao.EmployeeCriteriaRepository;
import com.hulk.magnit_phonenumber_database_service.dao.EmployeeRepository;
import com.hulk.magnit_phonenumber_database_service.dto.EmployeeDTOMapper;
import com.hulk.magnit_phonenumber_database_service.entity.Employee;
import com.hulk.magnit_phonenumber_database_service.dto.EmployeeDTO;
import com.hulk.magnit_phonenumber_database_service.auth.SearchRequest;
import com.hulk.magnit_phonenumber_database_service.entity.EmployeeSearchCriteria;
import com.hulk.magnit_phonenumber_database_service.exception.EmployeeNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private PasswordEncoder pwdEncoder;
    @Autowired
    private EmployeeCriteriaRepository employeeCriteriaRepository;
    @Autowired
    private EmployeeDTOMapper employeeDTOMapper;
    private static final Logger log = LoggerFactory.getLogger(EmployeeServiceImpl.class);

    @Async
    @Override
    public void saveEmployee(Employee employee) {
        log.info("Saving employee with username: " + employee.getUsername());

        employee.setPassword(pwdEncoder.encode(employee.getPassword()));

        employeeRepository.save(employee);
    }

    @Override
    public boolean updateEmployee(UpdateRequest updateRequest) {
        log.info("Saving employee with username: " + updateRequest.getId());
        return employeeCriteriaRepository.updateEmployee(updateRequest) == 1;
    }

    @Override
    public Page<EmployeeDTO> getEmployeesWithFilters(int offset, int limit, EmployeeSort sort, SearchRequest searchCriteria) {
        log.info("Getting employees with criteria = " + searchCriteria);
        return employeeCriteriaRepository.findAllWithFilters(PageRequest.of(offset, limit, sort.getSortValue()), searchCriteria)
                .map(employeeDTOMapper);
    }

    @Override
    public Page<EmployeeDTO> getEmployees(int offset, int limit, EmployeeSort sort) {
        log.info("Getting employees with offset = " + offset +
                ", limit = " + limit + ", sort = " + sort.toString());
        return employeeRepository.findAll(PageRequest.of(offset, limit, sort.getSortValue()))
                .map(employeeDTOMapper);
    }

    @Override
    public List<EmployeeDTO> getEmployees() {
        log.info("Getting employees for export file");

        return employeeRepository.findAll().stream()
                .map(employeeDTOMapper)
                .collect(Collectors.toList());
    }

    @Override
    public Employee getEmployee(UUID id) {
        log.info("Getting employee with id: " + id);
        return employeeRepository.findById(id)
                .orElseThrow(() -> {
                    var e = new EmployeeNotFoundException("There is no employee with this id");
                    log.warn("Failed to get employee with id: " + id);
                    return e;
                });
    }

    @Async
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
        boolean doesUserExists = employeeRepository.existsEmployeeByEmail(email);
        if (doesUserExists) {
            log.debug("User exists with email: " + email);
        } else {
            log.debug("User does not exist with email: " + email);
        }
        return employeeRepository.existsEmployeeByEmail(email);
    }
}
