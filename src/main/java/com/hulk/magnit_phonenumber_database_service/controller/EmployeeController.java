package com.hulk.magnit_phonenumber_database_service.controller;

import com.hulk.magnit_phonenumber_database_service.dto.EmployeeDTOMapper;
import com.hulk.magnit_phonenumber_database_service.entity.Employee;
import com.hulk.magnit_phonenumber_database_service.dto.EmployeeDTO;
import com.hulk.magnit_phonenumber_database_service.entity.EmployeeSearchCriteria;
import com.hulk.magnit_phonenumber_database_service.exception.*;
import com.hulk.magnit_phonenumber_database_service.service.EmployeeService;
import com.hulk.magnit_phonenumber_database_service.service.EmployeeSort;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/home")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private EmployeeDTOMapper employeeDTOMapper;

    @PostMapping("/employees")
    public ResponseEntity<EmployeeDTO> createEmployee(@RequestBody Employee employee) {
        if(employee==null){
            throw new EmployeeNotFoundException("There is no employee with ID = "+employee.getId()+"in Database");
        }

        Pattern patternSurname_Name = Pattern.compile("/^[a-zA-Z]{2,}$/");
        Matcher matcherSurname = patternSurname_Name.matcher(employee.getSurname().trim());
        Matcher matcherName = patternSurname_Name.matcher(employee.getName().trim());
        if (!matcherSurname.matches()) {
            throw new EmpSurnameException("Incorrect Surname");
        }
        if (!matcherName.matches()) {
            throw new EmpNameException("Incorrect Name");
        }
        //^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$  - phonenumber
        Pattern patternPassword = Pattern.compile(" /^\\w{6,}$/");
        Matcher matcherPassword = patternPassword.matcher(employee.getPassword().trim());
        if (!matcherPassword.matches()) {
            throw new EmpPasswordException("Incorrect Password");
        }

        Pattern patternEmail = Pattern.compile("\\w+@[a-zA-Z]+\\.[a-zA-Z]+");
        Matcher matcherEmail = patternEmail.matcher(employee.getEmail().trim());
        if (!matcherEmail.matches()) {
            throw new EmpNameException("Incorrect Email");
        }
        employeeService.saveEmployee(employee);

        return ResponseEntity.ok(employeeDTOMapper.apply(employee));
    }

    @PutMapping("/employees")
    public ResponseEntity<EmployeeDTO> updateEmployee(@RequestBody Employee employee) {
        if(employee==null){
            throw new EmployeeNotFoundException("There is no employee with ID = "+employee.getId()+"in Database");
        }

        Pattern patternSurname_Name = Pattern.compile("/^[a-zA-Z]{2,}$/");
        Matcher matcherSurname = patternSurname_Name.matcher(employee.getSurname().trim());
        Matcher matcherName = patternSurname_Name.matcher(employee.getName().trim());
        if (!matcherSurname.matches()) {
            throw new EmpSurnameException("Incorrect Surname");
        }
        if (!matcherName.matches()) {
            throw new EmpNameException("Incorrect Name");
        }
        //^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$  - phonenumber
        Pattern patternPassword = Pattern.compile(" /^\\w{6,}$/");
        Matcher matcherPassword = patternPassword.matcher(employee.getPassword().trim());
        if (!matcherPassword.matches()) {
            throw new EmpPasswordException("Incorrect Password");
        }

        Pattern patternEmail = Pattern.compile("\\w+@[a-zA-Z]+\\.[a-zA-Z]+");
        Matcher matcherEmail = patternEmail.matcher(employee.getEmail().trim());
        if (!matcherEmail.matches()) {
            throw new EmpNameException("Incorrect Email");
        }

        employeeService.saveEmployee(employee);

        return ResponseEntity.ok(employeeDTOMapper.apply(employee));
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<EmployeeDTO> getEmployee(@PathVariable UUID id) {
        return ResponseEntity.ok(employeeDTOMapper.apply(
                employeeService.getEmployee(id))
        );
    }

    @GetMapping("/employees/search")
    public ResponseEntity<Page<EmployeeDTO>> getAllEmployees(
            @RequestParam(value = "offset", defaultValue = "0") @Min(0) int offset,
            @RequestParam(value = "limit", defaultValue = "20") @Min(1) @Max(40) int limit,
            @RequestParam(value = "sort", defaultValue = "ID_ASC") EmployeeSort sort,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "surname", required = false) String surname,
            @RequestParam(value = "bossId", required = false) UUID bossId,
            @RequestParam(value = "department", required = false) String department,
            @RequestParam(value = "phonenumber", required = false) String phonenumber
    ) {
        EmployeeSearchCriteria searchCriteria = EmployeeSearchCriteria.builder()
                .name(name)
                .surname(surname)
                .bossId(bossId)
                .department(department)
                .phonenumber(phonenumber)
                .build();

        //TODO: check how pagination works

        return ResponseEntity.ok(employeeService.getEmployeesWithFilters(offset, limit, sort, searchCriteria));
    }

    @GetMapping("/employees")
    public ResponseEntity<Page<EmployeeDTO>> getEmployees(
            @RequestParam(value = "offset", defaultValue = "0") @Min(0) int offset,
            @RequestParam(value = "limit", defaultValue = "20") @Min(1) @Max(40) int limit,
            @RequestParam(value = "sort", defaultValue = "ID_ASC") EmployeeSort sort
    ) {
        return ResponseEntity.ok(employeeService.getEmployees(offset, limit, sort));
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable UUID id) {
        employeeService.deleteEmployee(id);

        return ResponseEntity.ok("Employee with id = " + id + " was deleted");
    }
}
