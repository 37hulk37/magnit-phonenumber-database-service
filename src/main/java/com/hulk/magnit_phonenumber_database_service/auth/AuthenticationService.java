package com.hulk.magnit_phonenumber_database_service.auth;


import com.hulk.magnit_phonenumber_database_service.exception.EmployeeAlreadyExistsException;
import com.hulk.magnit_phonenumber_database_service.exception.EmployeeNotFoundException;
import com.hulk.magnit_phonenumber_database_service.jwt.JwtService;
import com.hulk.magnit_phonenumber_database_service.entity.Employee;
import com.hulk.magnit_phonenumber_database_service.entity.Role;
import com.hulk.magnit_phonenumber_database_service.service.EmployeeServiceImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final EmployeeServiceImpl employeeService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private static final Logger log = LoggerFactory.getLogger(AuthenticationService.class);

    public AuthenticationResponse registerEmployee(RegisterRequest request) {
        log.info("Starting registration...");
        if (employeeService.existsUserByEmail(request.getEmail())) {
            throw new EmployeeAlreadyExistsException("Failed to register, user already exists with email: " + request.getEmail());
        }
        var employee = Employee.builder()
                .name(request.getName())
                .surname(request.getSurname())
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
                .build();
    }

    public AuthenticationResponse registerSession(AuthenticationRequest request)  {
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
                    .build();
        }
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        log.info("Starting authentication...");
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        Employee user = employeeService.findByEmail(request.getEmail())
                .orElseThrow(() -> new EmployeeNotFoundException("There is no employee with this email"));

        var jwtToken = jwtService.generateToken(user);
        log.info("Authentication completed");

        return AuthenticationResponse.builder()
                .code(HttpStatus.ACCEPTED)
                .token(jwtToken)
                .build();
    }
}
