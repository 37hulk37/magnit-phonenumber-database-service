package com.hulk.magnit_phonenumber_database_service.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hulk.magnit_phonenumber_database_service.exception.ErrorMessage;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException
    ) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        ErrorMessage errorDetails = new ErrorMessage(authException.getMessage());
        response.getWriter().write(objectMapper.writeValueAsString(errorDetails));
    }
}
