package com.opp.favorito.controllers;

import com.opp.favorito.HashPassword;
import com.opp.favorito.models.Admin;
import com.opp.favorito.models.Client;
import com.opp.favorito.models.Employee;
import com.opp.favorito.models.dto.CheckCredidentialsDTO;
import com.opp.favorito.services.AdminService;
import com.opp.favorito.services.ClientService;
import com.opp.favorito.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/rest/security")
public class SecurityController {
    
    @Autowired
    AdminService adminService;
    
    @Autowired
    EmployeeService employeeService;
    
    @Autowired
    ClientService clientService;

    @PostMapping("/admin")
    public ResponseEntity<Void> checkAdmin(@RequestBody CheckCredidentialsDTO checkCredidentialsDTO) {
        if(!checkCredidentialsDTO.isAdmin()) {
            return ResponseEntity.badRequest().build();
        }

        Optional<Admin> admin = adminService.getAdminByEmail(checkCredidentialsDTO.getUsername());

        if(!admin.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        if(!admin.get().getPassword().equals(checkCredidentialsDTO.getPassword())) {
            //lozinke se ne poklapaju
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }

    @PostMapping("/client")
    public ResponseEntity<Void> checkClient(@RequestBody CheckCredidentialsDTO checkCredidentialsDTO) {
        if(!checkCredidentialsDTO.isClient()) {
            return ResponseEntity.badRequest().build();
        }

        Optional<Client> client = clientService.getClientByEmail(checkCredidentialsDTO.getUsername());

        if(!client.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        if(!client.get().getPassword().equals(HashPassword.hashPassword(checkCredidentialsDTO.getPassword()))) {
            //lozinke se ne poklapaju
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }

    @PostMapping("/employee")
    public ResponseEntity<Void> checkEmployee(@RequestBody CheckCredidentialsDTO checkCredidentialsDTO) {
        //TODO: odkomentirat ovo posli
        if(!checkCredidentialsDTO.isEmployee()) {
            return ResponseEntity.badRequest().build();
        }

        Optional<Employee> employee = employeeService.getEmployeeByEmail(checkCredidentialsDTO.getUsername());

        if(!employee.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        if(!employee.get().getPassword().equals(HashPassword.hashPassword(checkCredidentialsDTO.getPassword()))) {
            //lozinke se ne poklapaju
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }

}
