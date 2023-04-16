package com.hulk.magnit_phonenumber_database_service.service;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;

@Getter
@RequiredArgsConstructor
public enum EmployeeSort {
    ID_ASC(Sort.by(Sort.Direction.ASC, "id")),
    ID_DESC(Sort.by(Sort.Direction.DESC, "id")),

    NAME_ASC(Sort.by(Sort.Direction.ASC, "name")),
    NAME_DESC(Sort.by(Sort.Direction.DESC, "name")),

    SURNAME_ASC(Sort.by(Sort.Direction.ASC, "surname")),
    SURNAME_DESC(Sort.by(Sort.Direction.DESC, "surname")),

    DEPARTMENT_ASC(Sort.by(Sort.Direction.ASC, "department")),
    DEPARTMENT_DESC(Sort.by(Sort.Direction.DESC, "department")),

    PHONENUMBER_ASC(Sort.by(Sort.Direction.ASC, "phonenumber")),
    PHONENUMBER_DESC(Sort.by(Sort.Direction.DESC, "phonenumber")),

    EMAIL_ASC(Sort.by(Sort.Direction.ASC, "email")),
    EMAIL_DESC(Sort.by(Sort.Direction.DESC, "email")),

    ROLE_ASC(Sort.by(Sort.Direction.ASC, "role")),
    ROLE_DESC(Sort.by(Sort.Direction.DESC, "role"));

    private final Sort sortValue;
}
