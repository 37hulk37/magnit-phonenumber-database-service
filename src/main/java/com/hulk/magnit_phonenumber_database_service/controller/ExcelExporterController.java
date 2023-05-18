package com.hulk.magnit_phonenumber_database_service.controller;
import java.io.*;
import java.util.List;

import com.hulk.magnit_phonenumber_database_service.dto.EmployeeDTO;
import com.hulk.magnit_phonenumber_database_service.service.EmployeeService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/excel")
public class ExcelExporterController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/export")
    public ResponseEntity export() {
        String fileName = "employees-export.xlsx";
        String directoryName = "output";
        File directory = new File(directoryName);

        if ( !directory.exists() ) {
            directory.mkdir();
        }

        ResponseEntity respEntity = null;

        try (FileOutputStream outputStream = new FileOutputStream(directoryName + "/" + fileName)) {

            List<EmployeeDTO> employees = employeeService.getEmployees();

            XSSFWorkbook workbook = new XSSFWorkbook();
            XSSFSheet sheet = workbook.createSheet("Employees");

            writeHeaderLine(sheet);

            writeDataLines(employees, workbook, sheet);

            workbook.write(outputStream);

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.add("content-disposition", "attachment; filename=" + fileName);
            respEntity = new ResponseEntity(outputStream, responseHeaders, HttpStatus.OK);

        } catch (IOException ex) {
            ex.printStackTrace();
        }

        return respEntity;
    }

    private void writeHeaderLine(XSSFSheet sheet) {

        Row headerRow = sheet.createRow(0);

        Cell headerCell = headerRow.createCell(0);
        headerCell.setCellValue("ID");

        headerCell = headerRow.createCell(1);
        headerCell.setCellValue("Name");

        headerCell = headerRow.createCell(2);
        headerCell.setCellValue("Surname");

        headerCell = headerRow.createCell(3);
        headerCell.setCellValue("Role");

        headerCell = headerRow.createCell(4);
        headerCell.setCellValue("Email");

        headerCell = headerRow.createCell(5);
        headerCell.setCellValue("Department");

        headerCell = headerRow.createCell(6);
        headerCell.setCellValue("Phonenumber");
    }

    private void writeDataLines(List<EmployeeDTO> employees,
                                XSSFWorkbook workbook,
                                XSSFSheet sheet) {
        int rowCount = 1;

        for (EmployeeDTO employee : employees) {
            String id = employee.id().toString();
            String Name = employee.name();
            String Surname = employee.surname();

            String Role = employee.role().toString();
            String Email = employee.email();
            String Department = employee.department();
            String Phonenumber = employee.phonenumber();

            Row row = sheet.createRow(rowCount++);

            int columnCount = 0;
            Cell cell = row.createCell(columnCount++);
            cell.setCellValue(id);

            cell = row.createCell(columnCount++);
            cell.setCellValue(Name);

            cell = row.createCell(columnCount++);
            cell.setCellValue(Surname);

            cell = row.createCell(columnCount++);
            cell.setCellValue(Role);

            cell = row.createCell(columnCount++);
            cell.setCellValue(Email);

            cell = row.createCell(columnCount++);
            cell.setCellValue(Department);

            cell = row.createCell(columnCount++);
            cell.setCellValue(Phonenumber);

            cell = row.createCell(columnCount++);

            CellStyle cellStyle = workbook.createCellStyle();
            CreationHelper creationHelper = workbook.getCreationHelper();
            cellStyle.setDataFormat(creationHelper.createDataFormat().getFormat("yyyy-MM-dd HH:mm:ss"));
            cell.setCellStyle(cellStyle);
        }
    }

}
