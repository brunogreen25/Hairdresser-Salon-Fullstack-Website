package com.opp.favorito.controllers;


import com.opp.favorito.models.Discount;
import com.opp.favorito.models.dto.FrequencyDiscountDTO;
import com.opp.favorito.models.dto.RecommendationDiscountDTO;
import com.opp.favorito.services.DiscountService;
import com.opp.favorito.services.interfaces.DiscountServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rest/discounts")
public class DiscountController {

    @Autowired
    private DiscountServiceInterface discountService;

    @GetMapping("")
    public ResponseEntity<List<Discount>> getAllDiscounts() {
        return ResponseEntity.ok(discountService.getAllDiscounts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Discount> getDiscount(@PathVariable Long id) {
        Optional<Discount> discount = discountService.getDiscountById(id);
        if(!discount.isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(discount.get());
    }

    @PostMapping("")
    public ResponseEntity<Void> addDiscount(@RequestBody Discount discount) {
        discountService.addDiscount(discount);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiscount(@PathVariable Long id) {
        if(!discountService.getDiscountById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        discountService.removeDiscount(id);
        Optional<Discount> shouldBeNull = discountService.getDiscountById(id);
        if(shouldBeNull.isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/updateDiscountR")
    public ResponseEntity<Void> updateDiscountR(@RequestBody RecommendationDiscountDTO recommendationDiscountDTO) {
        discountService.updateDiscountRValue(Double.parseDouble(recommendationDiscountDTO.getPercentage()));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/updateDiscountF")
    public ResponseEntity<Void> updateDiscountF(@RequestBody FrequencyDiscountDTO frequencyDiscountDTO) {
        discountService.updateDiscountFValueAndFrequency(Double.parseDouble(frequencyDiscountDTO.getPercentage()), frequencyDiscountDTO.getFrequency());
        return ResponseEntity.ok().build();
    }
}
