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
        if(employee.getName().length()<2){
            if (employee.getName().contains("1")||employee.getName().contains("2")||
                    employee.getName().contains("3")||employee.getName().contains("4")
                    ||employee.getName().contains("5")||employee.getName().contains("6")||employee.getName().contains("7")
                    ||employee.getName().contains("8")||employee.getName().contains("9")||employee.getName().contains("0")){
                throw new EmpNameException("Name shouldnt contain numbers");
            }else{
                throw new EmpNameException("Name must be >2 symbols");
            }

        }
        if(employee.getSurname().length()<2){
            if (employee.getSurname().contains("1")||employee.getSurname().contains("2")||
                    employee.getSurname().contains("3")||employee.getSurname().contains("4")
                    ||employee.getSurname().contains("5")||employee.getSurname().contains("6")||employee.getSurname().contains("7")
                    ||employee.getSurname().contains("8")||employee.getSurname().contains("9")||employee.getSurname().contains("0")){
                throw new EmpSurnameException("Surname shouldnt contain numbers");
            }else{
                throw new EmpSurnameException("Surname must be >2 symbols");
            }

        }
        if(employee.getPassword().length()<6){
            throw new EmpPasswordException("Password must me more than 6 symbols");
        }
        Pattern pattern = Pattern.compile("\\w+@[a-zA-Z]+\\.[a-zA-Z]+");
        Matcher matcher = pattern.matcher(employee.getEmail().trim());
        if (!matcher.matches()) {
            throw new EmpEmailException("Incorrect Email");
        }
        employeeService.saveEmployee(employee);

        return ResponseEntity.ok(employeeDTOMapper.apply(employee));
    }

    @PutMapping("/employees")
    public ResponseEntity<EmployeeDTO> updateEmployee(@RequestBody Employee employee) {
        if(employee==null){
            throw new EmployeeNotFoundException("There is no employee with ID = "+employee.getId()+"in Database");
        }
        if(employee.getName().length()<2){
            if (employee.getName().contains("1")||employee.getName().contains("2")||
                    employee.getName().contains("3")||employee.getName().contains("4")
                    ||employee.getName().contains("5")||employee.getName().contains("6")||employee.getName().contains("7")
                    ||employee.getName().contains("8")||employee.getName().contains("9")||employee.getName().contains("0")){
                throw new EmpNameException("Name shouldnt contain numbers");
            }else{
                throw new EmpNameException("Name must be >2 symbols");
            }

        }
        if(employee.getSurname().length()<2){
            if (employee.getSurname().contains("1")||employee.getSurname().contains("2")||
                    employee.getSurname().contains("3")||employee.getSurname().contains("4")
                    ||employee.getSurname().contains("5")||employee.getSurname().contains("6")||employee.getSurname().contains("7")
                    ||employee.getSurname().contains("8")||employee.getSurname().contains("9")||employee.getSurname().contains("0")){
                throw new EmpNameException("Surname shouldnt contain numbers");
            }else{
                throw new EmpNameException("Surname must be >2 symbols");
            }

        }
        if(employee.getPassword().length()<6){
            throw new EmpNameException("Password must me more than 6 symbols");
        }
        Pattern pattern = Pattern.compile("\\w+@[a-zA-Z]+\\.[a-zA-Z]+");
        Matcher matcher = pattern.matcher(employee.getEmail().trim());
        if (!matcher.matches()) {
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
