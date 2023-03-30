package com.opp.favorito.repository;

import com.opp.favorito.models.SalonService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SalonServiceRepository extends JpaRepository<SalonService, Long> {
    Optional<SalonService> findById(Long id);
    Optional<SalonService> findByName(String name);
}
