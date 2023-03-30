package com.opp.favorito.controllers;

import com.opp.favorito.models.Location;
import com.opp.favorito.services.LocationService;
import com.opp.favorito.services.interfaces.LocationServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rest/locations")
public class LocationController {

    @Autowired
    LocationServiceInterface locationService;

    @GetMapping("")
    public ResponseEntity<List<Location>> getAllLocations() {
        return ResponseEntity.ok(locationService.getAllLocations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Location> getLocation(@PathVariable Long id) {
        Location loc = locationService.getLocationById(id).orElse(null);
        if (loc == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(loc);
    }

    @PostMapping("")
    public ResponseEntity<Void> addLocation(@RequestBody Location location) {
        locationService.addLocation(location);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/city:{city}")
    public ResponseEntity<List<Location>> getLocationsByCity(@PathVariable String city) {
        List<Location> locs = locationService.getLocationsByCity(city);
        return ResponseEntity.ok(locs);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocation(@PathVariable Long id) {
        Optional<Location> optionalLocation = locationService.getLocationById(id);
        if(!optionalLocation.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        Location location = optionalLocation.get();
        locationService.deleteLocation(location);
        return ResponseEntity.ok().build();
    }
}
