package com.opp.favorito.services.interfaces;

import com.opp.favorito.models.Location;
import com.opp.favorito.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface LocationServiceInterface {

    public List<Location> getAllLocations();

    public void addLocation(Location location);

    public Optional<Location> getLocationById(Long id);

    public List<Location> getLocationsByCity(String city);

    public Location getLocationByAddressAndCity(String address, String city);

    public void deleteLocation(Location location);

}

