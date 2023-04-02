package com.hulk.magnit_phonenumber_database_service.auth;


import com.hulk.magnit_phonenumber_database_service.jwt.JwtService;
import com.hulk.magnit_phonenumber_database_service.entity.Employee;
import com.hulk.magnit_phonenumber_database_service.entity.Role;
import com.hulk.magnit_phonenumber_database_service.service.EmployeeServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final EmployeeServiceImpl employeeService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse registerEmployee(RegisterRequest request) {
        if (employeeService.existsUserByEmail(request.getEmail())) {
            return AuthenticationResponse.builder()
                    .code(HttpStatus.IM_USED)
                    .token(null)
                    .build();
        }
        var employee = Employee.builder()
                .name(request.getName())
                .surname(request.getSurname())
                .email(request.getEmail())
                .department(request.getDepartment())
                .phonenumber(request.getPhonenumber())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_USER)
                .build();

        employeeService.saveEmployee(employee);
        var jwtToken = jwtService.generateToken(employee);

        return AuthenticationResponse.builder()
                .code(HttpStatus.CREATED)
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse registerSession(AuthenticationRequest request) {
        if (employeeService.existsUserByEmail(request.getEmail())) {
            var jwtToken = jwtService.generateToken(employeeService.findByEmail(request.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("There is no employee with this email")));

            return AuthenticationResponse.builder()
                    .code(HttpStatus.ACCEPTED)
                    .token(jwtToken)
                    .build();

        } else {
            return AuthenticationResponse.builder()
                    .code(HttpStatus.NOT_FOUND)
                    .token(null)
                    .build();
        }
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = employeeService.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("There is no employee with this email"));

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .code(HttpStatus.ACCEPTED)
                .token(jwtToken)
                .build();
    }
}
