package com.hulk.magnit_phonenumber_database_service.dto;

import com.hulk.magnit_phonenumber_database_service.entity.Role;

import java.util.UUID;

public record EmployeeDTO (
        UUID id,
        String name,
        String surname,
        UUID bossId,
        String department,
        String email,
        String phonenumber,
        Role role,
        String imageContentType,
        byte[] image
) {
}
