package com.opp.favorito.services;

import com.opp.favorito.HashPassword;
import com.opp.favorito.models.Client;
import com.opp.favorito.repository.ClientRepository;
import com.opp.favorito.services.interfaces.ClientServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.Null;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ClientService implements ClientServiceInterface {

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public List<Client> getAllClients(){
        return clientRepository.findAll();
    }

    @Override
    public void addClient(Client client) {
        clientRepository.save(client);
    }

    @Override
    public Optional<Client> getClientById(Long id) {
        return clientRepository.findById(id);
    }

    @Override
    public Optional<Client> getClientByEmail(String clientEmail) {
        return clientRepository.findByEmail(clientEmail);
    }

    @Override
    public void addReccomendationCounter(String clientEmail) { clientRepository.addReccomendationCounter(clientEmail); }

    @Override
    public void deleteClient(Client client) {
        clientRepository.delete(client);
    }
}
