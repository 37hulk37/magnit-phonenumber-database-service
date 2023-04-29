package com.hulk.magnit_phonenumber_database_service.auth;


import com.hulk.magnit_phonenumber_database_service.dto.EmployeeDTOMapper;
import com.hulk.magnit_phonenumber_database_service.exception.EmployeeAlreadyExistsException;
import com.hulk.magnit_phonenumber_database_service.exception.EmployeeNotFoundException;
import com.hulk.magnit_phonenumber_database_service.jwt.JwtService;
import com.hulk.magnit_phonenumber_database_service.entity.Employee;
import com.hulk.magnit_phonenumber_database_service.entity.Role;
import com.hulk.magnit_phonenumber_database_service.service.EmployeeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private EmployeeDTOMapper employeeDTOMapper;
    private static final Logger log = LoggerFactory.getLogger(AuthenticationService.class);

    public AuthenticationResponse createEmployee(RegisterRequest request) {
        log.info("Starting registration...");
        if (employeeService.existsUserByEmail(request.getEmail())) {
            throw new EmployeeAlreadyExistsException("Failed to register, " +
                    "employee already exists with email: " + request.getEmail());
        }
        var employee = Employee.builder()
                .name(request.getName())
                .surname(request.getSurname())
                .bossId(request.getBossId())
                .email(request.getEmail())
                .department(request.getDepartment())
                .phonenumber(request.getPhonenumber())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        employeeService.saveEmployee(employee);
        var jwtToken = jwtService.generateToken(employee);
        log.info("Registration completed");

        return AuthenticationResponse.builder()
                .code(HttpStatus.CREATED)
                .token(jwtToken)
                .user(employeeDTOMapper.apply(employee))
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request)  {
        log.info("Starting session registration...");
        String email = request.getEmail();
        Optional<Employee> foundEmployee = employeeService.findByEmail(email);
        if (foundEmployee.isEmpty()) {
            throw new EmployeeNotFoundException("Failed to register session, there is no employee with email: " + email);
        } else {
            var jwtToken = jwtService.generateToken(foundEmployee.get());
            log.info("Session registration completed");

            return AuthenticationResponse.builder()
                    .code(HttpStatus.ACCEPTED)
                    .token(jwtToken)
                    .user(employeeDTOMapper.apply(foundEmployee.get()))
                    .build();
        }
    }
}
