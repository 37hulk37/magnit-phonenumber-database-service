package com.hulk.magnit_phonenumber_database_service.controller;
import java.io.*;
import java.sql.*;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.*;
public class SimpleDb2ExcelExporter {

    public static void main(String[] args) {
        new SimpleDb2ExcelExporter().export();
    }

    public void export() {
        String jdbcURL = "jdbc:postgresql://localhost:5432/magnit-db";
        String username = "postgres";
        String password = "Severinaandrey123";

        File directory = new File("C:/Users/днс/IdeaProjects/magnit-phonenumber-database-service-1/ExcelOutput");

        if (directory.mkdir()) {
            System.out.println("Directory created successfully");
        }
        String excelFilePath = "ExcelOutput/Employees-export.xlsx";

        try (Connection connection = DriverManager.getConnection(jdbcURL, username, password)) {
            String sql = "SELECT * FROM employees";

            Statement statement = connection.createStatement();

            ResultSet result = statement.executeQuery(sql);

            XSSFWorkbook workbook = new XSSFWorkbook();
            XSSFSheet sheet = workbook.createSheet("Employees");

            writeHeaderLine(sheet);

            writeDataLines(result, workbook, sheet);

            FileOutputStream outputStream = new FileOutputStream(excelFilePath);
            workbook.write(outputStream);
            workbook.close();

            statement.close();

        } catch (SQLException e) {
            System.out.println("Datababse error:");
            e.printStackTrace();
        } catch (IOException e) {
            System.out.println("File IO error:");
            e.printStackTrace();
        }
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

    private void writeDataLines(ResultSet result, XSSFWorkbook workbook,
                                XSSFSheet sheet) throws SQLException {
        int rowCount = 1;

        while (result.next()) {
            String ID = result.getString("id");
            String Name = result.getString("name");
            String Surname = result.getString("surname");

            String Role = result.getString("role");
            String Email = result.getString("email");
            String Department = result.getString("department");
            String Phonenumber = result.getString("phonenumber");

            Row row = sheet.createRow(rowCount++);

            int columnCount = 0;
            Cell cell = row.createCell(columnCount++);
            cell.setCellValue(ID);

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
