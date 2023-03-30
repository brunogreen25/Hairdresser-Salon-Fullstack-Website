package com.opp.favorito.controllers;


import com.opp.favorito.services.PDFService;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileNotFoundException;

@RestController
@RequestMapping("/rest/pdf")
public class PDFController {

    @Autowired
    PDFService pdfService;

    @GetMapping("/{format}/{id}")
    public String generateReport(@PathVariable String format, @PathVariable String id) throws FileNotFoundException, JRException {
        return pdfService.exportReport(format, id);
    }
}
