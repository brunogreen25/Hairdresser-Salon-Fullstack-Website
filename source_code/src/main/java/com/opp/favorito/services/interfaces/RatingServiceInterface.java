package com.opp.favorito.services.interfaces;

import com.opp.favorito.models.Employee;
import com.opp.favorito.models.Rating;
import com.opp.favorito.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface RatingServiceInterface {

    public List<Rating> getAllRatings();

    public void addRating(Rating rating);

    public Optional<Rating> getRatingById(Long id);

    public List<Rating> getRatingsByEmployeeId(Long employeeId);

    public List<String> getNewRatings();
}
