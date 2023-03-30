package com.opp.favorito.services;

import com.opp.favorito.models.SalonService;
import com.opp.favorito.repository.SalonServiceRepository;
import com.opp.favorito.services.interfaces.SalonServiceServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SalonServiceService implements SalonServiceServiceInterface {
    @Autowired
    private SalonServiceRepository salonServiceRepository;

    @Override
    public List<SalonService> getAllSalonServices(){
        return salonServiceRepository.findAll();
    }

    @Override
    public void addSalonService(SalonService salonService) {
        salonServiceRepository.save(salonService);
    }

    @Override
    public Optional<SalonService> getFavourById(Long id) {
        return salonServiceRepository.findById(id);
    }

    @Override
    public void removeSalonService(Long id) {
        salonServiceRepository.deleteById(id);
    }

    @Override
    public SalonService getSalonServiceByName(String name) {
        return salonServiceRepository.findByName(name).orElse(null);
    }
 }

