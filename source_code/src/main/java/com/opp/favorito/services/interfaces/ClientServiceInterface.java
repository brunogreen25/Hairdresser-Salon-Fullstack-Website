package com.opp.favorito.services.interfaces;

import com.opp.favorito.models.Client;

import java.util.List;
import java.util.Optional;

public interface ClientServiceInterface {
    public List<Client> getAllClients();

    public void addClient(Client client);

    public Optional<Client> getClientById(Long id);

    public Optional<Client> getClientByEmail(String clientEmail);

    public void addReccomendationCounter(String clientEmail);

    public void deleteClient(Client client);
}
