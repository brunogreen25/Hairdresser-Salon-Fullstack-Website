package com.opp.favorito.repository;

import com.opp.favorito.models.Discount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface DiscountRepository extends JpaRepository<Discount, Long> {
    @Transactional
    @Modifying
    @Query("update Discount d set d.discountFrequency = :discountFreq where d.type = 'F'")
    void updateDiscountFFrequency(@Param("discountFreq") int discountFreq);

    @Transactional
    @Modifying
    @Query("update Discount d set d.value = :discountValue where d.type = 'F'")
    void updateDiscountFValue(@Param("discountValue") double discountValue);

    @Transactional
    @Modifying
    @Query("update Discount d set d.value = :discountValue where d.type = 'R'")
    void updateDiscountRValue(@Param("discountValue") double discountValue);

    Optional<Discount> findByType(String type);


}
