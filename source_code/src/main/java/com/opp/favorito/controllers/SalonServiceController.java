package com.opp.favorito.controllers;


import com.opp.favorito.models.Employee;
import com.opp.favorito.models.SalonService;
import com.opp.favorito.models.dto.CreateSalonServiceDTO;
import com.opp.favorito.services.SalonServiceService;
import com.opp.favorito.services.interfaces.SalonServiceServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/rest/salonservices")
public class SalonServiceController {
    @Autowired
    private SalonServiceServiceInterface salonServiceService;

    @GetMapping("")
    public ResponseEntity<List<SalonService>> getAllLocations() {
        return ResponseEntity.ok(salonServiceService.getAllSalonServices());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SalonService> getFavour(@PathVariable Long id) {
        SalonService fav = salonServiceService.getFavourById(id).orElse(null);
        if (fav == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(fav);
    }

    @PostMapping("")
    public ResponseEntity<Void> addFavour(@RequestBody SalonService salonService) {
        salonServiceService.addSalonService(salonService);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createFavour(@RequestBody CreateSalonServiceDTO createSalonServiceDTO) {
        SalonService salonService = new SalonService();
        salonService.setName(createSalonServiceDTO.getName());
        salonService.setPrice(createSalonServiceDTO.getPrice());
        salonService.setEmployees(null);
        salonServiceService.addSalonService(salonService);

        SalonService favCheck = salonServiceService.getSalonServiceByName(createSalonServiceDTO.getName());
        if (favCheck == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/name:{name}")
    public ResponseEntity<SalonService> getFavourByName(@PathVariable String name) {
        return ResponseEntity.ok(salonServiceService.getSalonServiceByName(name));
    }

    @GetMapping("/employee-name:{name}")
    public ResponseEntity<Set<Employee>> getEmployeesByFavourName(@PathVariable String name) {
        SalonService salonService = salonServiceService.getSalonServiceByName(name);
        return ResponseEntity.ok(salonService.getEmployees());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeFavour(@PathVariable Long id) {
        SalonService toBeRemovedSalonService = salonServiceService.getFavourById(id).orElse(null);
        if(toBeRemovedSalonService == null) {
            return ResponseEntity.notFound().build();
        }
        salonServiceService.removeSalonService(toBeRemovedSalonService.getId());

        Optional<SalonService> shouldBeNull = salonServiceService.getFavourById(id);
        if (shouldBeNull.isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

}
