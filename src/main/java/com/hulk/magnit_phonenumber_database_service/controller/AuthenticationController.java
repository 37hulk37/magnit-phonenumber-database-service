package com.hulk.magnit_phonenumber_database_service.controller;

import com.hulk.magnit_phonenumber_database_service.auth.AuthenticationRequest;
import com.hulk.magnit_phonenumber_database_service.auth.AuthenticationResponse;
import com.hulk.magnit_phonenumber_database_service.jwt.AuthenticationService;
import com.hulk.magnit_phonenumber_database_service.auth.RegisterRequest;
import com.hulk.magnit_phonenumber_database_service.exception.EmpNameException;
import com.hulk.magnit_phonenumber_database_service.exception.EmpPasswordException;
import com.hulk.magnit_phonenumber_database_service.exception.EmpSurnameException;
import com.hulk.magnit_phonenumber_database_service.exception.EmployeeNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/create-employee")
    public ResponseEntity<AuthenticationResponse> createEmployee(@RequestBody RegisterRequest request) {
        if(request==null){
            throw new EmployeeNotFoundException("There is no employee in Database");
        }

        Pattern patternSurnameName = Pattern.compile("[a-zA-Z]{2,}$");
        Matcher matcherSurname = patternSurnameName.matcher(request.getSurname().trim());
        Matcher matcherName = patternSurnameName.matcher(request.getName().trim());
        if (!matcherSurname.matches()) {
            throw new EmpSurnameException("Incorrect Surname"+request.getSurname());
        }
        if (!matcherName.matches()) {
            throw new EmpNameException("Incorrect Name"+request.getName());
        }

        Pattern patternPassword = Pattern.compile("^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){6,16}$");
        Matcher matcherPassword = patternPassword.matcher(request.getPassword().trim());
        if (!matcherPassword.matches()) {
            throw new EmpPasswordException("Incorrect Password"+request.getPassword());
        }
        Pattern patternEmail = Pattern.compile("\\w+@[a-zA-Z]+\\.[a-zA-Z]+");
        Matcher matcherEmail = patternEmail.matcher(request.getEmail().trim());
        if (!matcherEmail.matches()) {
            throw new EmpNameException("Incorrect Email"+request.getEmail());
        }
        return ResponseEntity.ok(service.createEmployee(request));
    }
}
