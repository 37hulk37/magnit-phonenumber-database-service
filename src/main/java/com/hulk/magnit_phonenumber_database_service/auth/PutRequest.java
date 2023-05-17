package com.hulk.magnit_phonenumber_database_service.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PutRequest {
    private UUID id;
    private String state;
}
