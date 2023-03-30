package com.opp.favorito.services.interfaces;

import com.opp.favorito.models.Discount;
import com.opp.favorito.repository.DiscountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

public interface DiscountServiceInterface {

    public List<Discount> getAllDiscounts();

    public void addDiscount(Discount discount);

    public Optional<Discount> getDiscountById(Long id);

    public void removeDiscount(Long id);

    public void updateDiscountRValue(double value);

    public void updateDiscountFValueAndFrequency(double value, int freq);
}
