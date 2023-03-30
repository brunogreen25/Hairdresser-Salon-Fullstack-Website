package com.opp.favorito.controllers;

import com.opp.favorito.HashPassword;
import com.opp.favorito.models.Client;
import com.opp.favorito.models.dto.LoginDTO;
import com.opp.favorito.models.dto.RegistrateClientDTO;
import com.opp.favorito.repository.EmployeeRepository;
import com.opp.favorito.services.AdminService;
import com.opp.favorito.services.ClientService;
import com.opp.favorito.services.EmployeeService;
import com.opp.favorito.services.interfaces.AdminServiceInterface;
import com.opp.favorito.services.interfaces.ClientServiceInterface;
import com.opp.favorito.services.interfaces.EmployeeServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rest/client")
public class ClientController {
    @Autowired
    private AdminServiceInterface adminService;

    @Autowired
    private EmployeeServiceInterface employeeService;

    @Autowired
    private ClientServiceInterface clientService;

    @GetMapping("")
    public ResponseEntity<List<Client>> getAllClients() {
        List<Client> clients = clientService.getAllClients();
        return ResponseEntity.ok().body(clients);
    }

    @PostMapping("/{id}")
    public ResponseEntity<Client> getClient(@PathVariable Long id) {
        Client client = clientService.getClientById(id).orElse(null);
        if (client == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(client);
        }
    }

    @PostMapping("")
    public ResponseEntity<Void> addClient(@RequestBody Client client) {
        clientService.addClient(client);
        if(clientService.getClientByEmail(client.getEmail()).isPresent()) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/e-mail:{clientEmail}")
    public ResponseEntity<Client> getClientByEmail(@PathVariable String clientEmail) {
        Client client = clientService.getClientByEmail(clientEmail).orElse(null);
        if(client == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(client);
        }
    }

    @Autowired
    MailController mailController;

    @PostMapping("/register")
    public ResponseEntity<Void> registrationClient(@RequestBody RegistrateClientDTO registrateClientDTO) {
        Client client = new Client();

        if(clientService.getClientByEmail(registrateClientDTO.geteMail()).isPresent() || employeeService.getEmployeeByEmail(registrateClientDTO.geteMail()).isPresent() || adminService.getAdminByEmail(registrateClientDTO.geteMail()).isPresent()) {
            //ako postoji mail
            return ResponseEntity.badRequest().build();
        }

        if(registrateClientDTO.getReccomendationEmail() != "") {
            //ako si navea rec mail
            if (!clientService.getClientByEmail(registrateClientDTO.getReccomendationEmail()).isPresent()) {
                //ako rec mail nepostoji
                return ResponseEntity.notFound().build();
            } else {
                //ako rec mail postoji, dodaj mu 1
                clientService.addReccomendationCounter(registrateClientDTO.getReccomendationEmail());
            }
        }

        mailController.sendMailToClient(registrateClientDTO);

        client.setEmail(registrateClientDTO.geteMail());
        client.setName(registrateClientDTO.getName());
        client.setSurname(registrateClientDTO.getSurname());

        String hashPassword = HashPassword.hashPassword(registrateClientDTO.getPassword());
        client.setPassword(hashPassword);

        client.setReservationsCounter(0);
        client.setRecomendationCounter(0);

        clientService.addClient(client);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<Void> loginClient(@RequestBody LoginDTO loginDTO) {
        Client client = clientService.getClientByEmail(loginDTO.geteMail()).orElse(null);
        if(client == null) {
            return ResponseEntity.notFound().build();
        }

        String hashPassword = HashPassword.hashPassword(loginDTO.getPassword());
        if(client.getPassword().equals(hashPassword)){
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }

        //ako frontend nije dobio error, onda je login uspjesan (bitno koristit .catch() u implementaciji Fetch API-ja za ovu metodu)
    }

    @GetMapping("/recomendation/email:{eMail}")
    public ResponseEntity<Void> addRecomendationCount(@PathVariable String eMail) {
        Optional<Client> client = clientService.getClientByEmail(eMail);
        if (!client.isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        int recCountPrev = client.get().getRecomendationCounter();

        clientService.addReccomendationCounter(eMail);

        client = clientService.getClientByEmail(eMail);
        if(!client.isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        int recCountPost =client.get().getRecomendationCounter();

        if (recCountPost - 1 == recCountPrev) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/delte/email:{eMail}")
    public ResponseEntity<Void> deleteUser(@PathVariable String eMail) {
        Optional<Client> optionalClient = clientService.getClientByEmail(eMail);
        if(!optionalClient.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Client client = optionalClient.get();
        clientService.deleteClient(client);
        return ResponseEntity.ok().build();
    }
}
