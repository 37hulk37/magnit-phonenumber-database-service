package com.hulk.magnit_phonenumber_database_service.controller;

import com.hulk.magnit_phonenumber_database_service.entity.Employee;
import com.hulk.magnit_phonenumber_database_service.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/api")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/employees")
    public String createEmployee(@ModelAttribute("employee") Employee employee) {
        employeeService.saveEmployee(employee);

        return "redirect:/api/get-employees";
    }

    @GetMapping("/create-employees")
    public String createEmployee(Model model) {
        model.addAttribute("employee", new Employee());

        return "create-employee";
    }

    @PutMapping("/employees")
    public String updateEmployee(@ModelAttribute("employee") Employee employee) {
        employeeService.saveEmployee(employee);

        return "redirect:/api/get-employees";
    }

    @GetMapping("/employees/{id}")
    public String getEmployee(@PathVariable UUID id, Model model) {
        Employee employee = employeeService.getEmployee(id);
        model.addAttribute("employee", employee);

        return "employee";
    }

    @DeleteMapping("/employees/{id}")
    public String deleteEmployee(@PathVariable UUID id) {
        employeeService.deleteEmployee(id);

        return "redirect:/api/get-employees";
    }

    @GetMapping("/get-employees")
    public String getAllEmployees(Model model) {
        List<Employee> employees = employeeService.getAllEmployees();
        model.addAttribute("employees", employees);

        return "all-employees";
    }
}
