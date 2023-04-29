package com.hulk.magnit_phonenumber_database_service.dto;

import com.hulk.magnit_phonenumber_database_service.entity.Employee;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class EmployeeDTOMapper implements Function<Employee, EmployeeDTO> {
    @Override
    public EmployeeDTO apply(Employee employee) {
        return new EmployeeDTO(
                employee.getId(),
                employee.getName(),
                employee.getSurname(),
                employee.getBossId(),
                employee.getDepartment(),
                employee.getEmail(),
                employee.getPhonenumber(),
                employee.getRole()
        );
    }
}
