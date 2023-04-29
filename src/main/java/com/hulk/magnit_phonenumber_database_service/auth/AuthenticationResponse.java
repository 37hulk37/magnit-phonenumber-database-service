package com.hulk.magnit_phonenumber_database_service.auth;

import com.hulk.magnit_phonenumber_database_service.dto.EmployeeDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String token;
    private HttpStatus code;
    private EmployeeDTO user;
}
