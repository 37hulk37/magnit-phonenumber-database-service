package com.hulk.magnit_phonenumber_database_service.service;

import com.hulk.magnit_phonenumber_database_service.dao.EmployeeCriteriaRepository;
import com.hulk.magnit_phonenumber_database_service.dao.EmployeeRepository;
import com.hulk.magnit_phonenumber_database_service.dto.EmployeeDTOMapper;
import com.hulk.magnit_phonenumber_database_service.entity.Employee;
import com.hulk.magnit_phonenumber_database_service.dto.EmployeeDTO;
import com.hulk.magnit_phonenumber_database_service.entity.EmployeeSearchCriteria;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

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

    @Override
    public void saveEmployee(Employee employee) {
        log.info("Saving employee with username: " + employee.getUsername());

        System.out.println(pwdEncoder.encode(employee.getPassword()));
        employee.setPassword(pwdEncoder.encode(employee.getPassword()));
        System.out.println(pwdEncoder.encode(employee.getPassword()));

        employeeRepository.save(employee);
    }

    @Override
    public Page<EmployeeDTO> getEmployeesWithFilters(int offset, int limit, EmployeeSort sort, EmployeeSearchCriteria searchCriteria) {
        log.info("Getting employees with criteria = " + searchCriteria);
        return employeeCriteriaRepository.findAllWithFilters(searchCriteria)
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
    public Employee getEmployee(UUID id) {
        log.info("Getting employee with id: " + id);
        return employeeRepository.findById(id)
                .orElseThrow(() -> {
                    var e = new UsernameNotFoundException("There is no employee with this id");
                    log.warn("Failed to get employee with id: " + id);
                    return e;
                });
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
        boolean doesUserExists = employeeRepository.existsEmployeeByEmail(email);
        if (doesUserExists) {
            log.debug("User exists with email: " + email);
        } else {
            log.debug("User does not exist with email: " + email);
        }
        return employeeRepository.existsEmployeeByEmail(email);
    }
}
