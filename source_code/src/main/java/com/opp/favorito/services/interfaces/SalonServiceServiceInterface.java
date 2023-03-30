package com.opp.favorito.services.interfaces;

import com.opp.favorito.models.SalonService;
import com.opp.favorito.repository.SalonServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface SalonServiceServiceInterface {

    public List<SalonService> getAllSalonServices();

    public void addSalonService(SalonService salonService);

    public Optional<SalonService> getFavourById(Long id);

    public void removeSalonService(Long id);

    public SalonService getSalonServiceByName(String name);
 }

