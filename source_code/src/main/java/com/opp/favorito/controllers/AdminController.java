package com.opp.favorito.controllers;

import com.opp.favorito.models.Admin;
import com.opp.favorito.models.dto.LoginDTO;
import com.opp.favorito.services.interfaces.AdminServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;
import com.opp.favorito.services.AdminService;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rest/admin")
public class AdminController {
    @Autowired
    private AdminServiceInterface adminService;

    @GetMapping("")
    public ResponseEntity<List<Admin>> getAllAdmins() {
        List<Admin> admins = adminService.getAllAdmins();
        return ResponseEntity.ok(admins);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdmin(@PathVariable Long id) {
        Optional<Admin> admin = adminService.getAdminById(id);
        if(admin.isPresent()) {
            return ResponseEntity.ok(admin.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("")
    public ResponseEntity<Void> addAdmin(@RequestBody Admin admin) {
        adminService.addAdmin(admin);
        if(adminService.getAdminById(admin.getId()).isPresent()) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeAdmin(@PathVariable Long id) {
        adminService.removeAdmin(id);
        if (adminService.getAdminById(id).isPresent()) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginDTO> loginAdmin(@RequestBody LoginDTO loginDTO) {
        Admin admin = adminService.getAdminByEmail(loginDTO.geteMail()).orElse(null);
        if(admin == null) {
            return ResponseEntity.notFound().build();
        }

        String password = loginDTO.getPassword();
        if (!password.equals(admin.getPassword())) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello World";
    }
}
