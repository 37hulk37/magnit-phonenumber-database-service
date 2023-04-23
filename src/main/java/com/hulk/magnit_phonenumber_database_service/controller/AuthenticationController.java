package com.hulk.magnit_phonenumber_database_service.controller;

import com.hulk.magnit_phonenumber_database_service.auth.AuthenticationRequest;
import com.hulk.magnit_phonenumber_database_service.auth.AuthenticationResponse;
import com.hulk.magnit_phonenumber_database_service.auth.AuthenticationService;
import com.hulk.magnit_phonenumber_database_service.auth.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody AuthenticationRequest request) {
        System.out.println(request);
        return ResponseEntity.ok(service.registerSession(request));
    }

    @PostMapping("/create-employee")
    public ResponseEntity<AuthenticationResponse> createEmployee(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.registerEmployee(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }
}
