package com.hulk.magnit_phonenumber_database_service.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

@RestControllerAdvice
public class ExceptionApiHandler {
    private static final Logger log = LoggerFactory.getLogger(ExceptionApiHandler.class);

    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<ErrorMessage> handleEmployeeNotFoundException(EmployeeNotFoundException e) {
        log.warn(e.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new ErrorMessage(e.getMessage()));
    }

    @ExceptionHandler(EmployeeAlreadyExistsException.class)
    public ResponseEntity<ErrorMessage> handleEmployeeAlreadyExistsException(EmployeeAlreadyExistsException e) {
        log.warn(e.getMessage());
        return ResponseEntity
                .status(HttpStatus.IM_USED)
                .body(new ErrorMessage(e.getMessage()));
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorMessage> handleBadCredentialsException(BadCredentialsException e) {
        log.warn(e.getMessage());
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorMessage(e.getMessage()));
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ErrorMessage> handleNoHandlerFoundException(NoHandlerFoundException e) {
        log.warn(e.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new ErrorMessage(e.getMessage()));
    }
}
