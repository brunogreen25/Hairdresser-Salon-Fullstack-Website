package com.opp.favorito.repository;

import com.opp.favorito.models.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Long> {
    Optional<Location> findByAddress(String address);
    Optional<Location> findById(Long id);
    List<Location> findByCity(String city);

    Optional<Location> findByAddressAndCity(String address, String city);
}
