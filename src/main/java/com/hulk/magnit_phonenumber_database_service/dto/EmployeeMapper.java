package com.hulk.magnit_phonenumber_database_service.dto;

import com.hulk.magnit_phonenumber_database_service.entity.Employee;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class EmployeeMapper implements Function<EmployeeDTO, Employee> {
    @Override
    public Employee apply(EmployeeDTO employeeDTO) {
        return new Employee(employeeDTO);
    }
}
