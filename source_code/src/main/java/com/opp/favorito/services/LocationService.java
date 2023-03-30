package com.opp.favorito.services;

import com.opp.favorito.models.Location;
import com.opp.favorito.repository.LocationRepository;
import com.opp.favorito.services.interfaces.LocationServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LocationService implements LocationServiceInterface {
    @Autowired
    private LocationRepository locationRepository;

    @Override
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    @Override
    public void addLocation(Location location) {
        locationRepository.save(location);
    }

    @Override
    public Optional<Location> getLocationById(Long id) {
        return locationRepository.findById(id);
    }

    @Override
    public List<Location> getLocationsByCity(String city) {
        return locationRepository.findByCity(city);
    }

    @Override
    public Location getLocationByAddressAndCity(String address, String city) {
        Optional<Location> locationOptional = locationRepository.findByAddressAndCity(address, city);
        return locationOptional.orElse(null);
    }

    @Override
    public void deleteLocation(Location location) {
        locationRepository.delete(location);
    }

}
//TODO: na kraju, svugdi umisto .get() napisi orElse()

