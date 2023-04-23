package com.hulk.magnit_phonenumber_database_service.entity;

import java.util.UUID;

public record EmployeeDTO (
        UUID id,
        String name,
        String surname,
        String department,
        String email,
        String phonenumber
) {
}
