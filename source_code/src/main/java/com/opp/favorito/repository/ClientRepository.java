package com.opp.favorito.repository;

import com.opp.favorito.models.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Long> {
    Optional<Client> findById(Long id);
    Optional<Client> findByEmail(String clientEmail);

    @Transactional
    @Modifying
    @Query("update Client c set c.recomendationCounter = c.recomendationCounter + 1 where c.email = :eMail")
    void addReccomendationCounter(@Param("eMail") String eMail);
}
