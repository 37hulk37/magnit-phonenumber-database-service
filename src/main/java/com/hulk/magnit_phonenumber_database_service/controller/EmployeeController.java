package com.hulk.magnit_phonenumber_database_service.controller;

import com.hulk.magnit_phonenumber_database_service.entity.Employee;
import com.hulk.magnit_phonenumber_database_service.service.EmployeeService;
import com.hulk.magnit_phonenumber_database_service.service.EmployeeSort;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Controller
@RequestMapping("/home")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping()
    public String login(Model model) {
        return "login";
    }

    @PostMapping("/employees")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        employeeService.saveEmployee(employee);

        return ResponseEntity.ok(employee);
    }

    @PutMapping("/employees")
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee) {
        employeeService.saveEmployee(employee);

        return ResponseEntity.ok(employee);
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable UUID id) {
        return ResponseEntity.ok(employeeService.getEmployee(id));
    }

    @GetMapping("/employees")
    public ResponseEntity<Page<Employee>> getEmployees(
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
