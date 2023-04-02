package com.hulk.magnit_phonenumber_database_service.controller;

import com.hulk.magnit_phonenumber_database_service.entity.Employee;
import com.hulk.magnit_phonenumber_database_service.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/api/v1/controller")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping()
    public String home(Model model) {
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
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable UUID id) {
        employeeService.deleteEmployee(id);

        return ResponseEntity.ok("Employee with id = " + id + " was deleted");
    }
}
