package com.hulk.magnit_phonenumber_database_service.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmployeeSearchCriteria {
    private String name;
    private String surname;
    private UUID bossId;
    private String department;
    private String phonenumber;
}
