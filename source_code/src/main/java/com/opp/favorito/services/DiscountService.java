package com.opp.favorito.services;

import com.opp.favorito.models.Discount;
import com.opp.favorito.repository.DiscountRepository;
import com.opp.favorito.services.interfaces.DiscountServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
public class DiscountService implements DiscountServiceInterface {
    @Autowired
    private DiscountRepository discountRepository;

    private final String typeR = "R";
    private final String typeF = "F";
    private final int discountDefaultFreq = 0;

    @Override
    public List<Discount> getAllDiscounts(){
        return discountRepository.findAll();
    }

    @Override
    public void addDiscount(Discount discount) {
        discountRepository.save(discount);
    }

    @Override
    public Optional<Discount> getDiscountById(Long id) {
        return discountRepository.findById(id);
    }

    @Override
    public void removeDiscount(Long id) {
        Optional<Discount> toBeRemovedDiscount = discountRepository.findById(id);
        Assert.isTrue(toBeRemovedDiscount.isPresent(), "Cannot find Discount with id");
        discountRepository.deleteById(id);
    }

    @Override
    public void updateDiscountRValue(double value) {
        Optional<Discount> optionalDiscount = discountRepository.findByType(typeR);

        if(optionalDiscount.isPresent()) {
            discountRepository.updateDiscountRValue(value);
        } else {
            Discount discount = new Discount(typeR, value, discountDefaultFreq);
            discountRepository.save(discount);
        }
    }

    @Override
    public void updateDiscountFValueAndFrequency(double value, int freq) {
        Optional<Discount> optionalDiscount = discountRepository.findByType(typeF);

        if(optionalDiscount.isPresent()) {
            discountRepository.updateDiscountFValue(value);
            discountRepository.updateDiscountFFrequency(freq);
        } else {
            Discount discount = new Discount(typeF, value, freq);
            discountRepository.save(discount);
        }
    }
}
