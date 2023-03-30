package com.opp.favorito.services;


import com.opp.favorito.models.Employee;
import com.opp.favorito.repository.EmployeeRepository;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PDFService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public String exportReport(String reportFormat, String id) throws FileNotFoundException, JRException {
        String path = "C:\\Users\\klara\\Desktop\\";
        String userprofile = System.getenv("USERPROFILE");
        path = userprofile+"\\Desktop\\";
       // String path = "C:/Users/klara/Desktop/";
        List<Employee> employees = employeeRepository.findAll();
        //load file and compile it
        File file = ResourceUtils.getFile("classpath:pdf.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
        //JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(employees);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("param1", id.toString());
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters);

        //JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
        if (reportFormat.equalsIgnoreCase("html")) {
            JasperExportManager.exportReportToHtmlFile(jasperPrint, path + "\\potvrdaRezervacije.html");
        }
        if (reportFormat.equalsIgnoreCase("pdf")) {
            JasperExportManager.exportReportToPdfFile(jasperPrint, path + "\\potvrdaRezervacije.pdf");
        }

        return "Potvrda o rezervaciji je generirana u PATH-u : " + path;
    }
}
