package com.opp.favorito.services;

import com.opp.favorito.models.Client;
import com.opp.favorito.models.Employee;
import com.opp.favorito.models.Rating;
import com.opp.favorito.repository.EmployeeRepository;
import com.opp.favorito.repository.RatingRepository;
import com.opp.favorito.services.interfaces.RatingServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
public class RatingService implements RatingServiceInterface {
    //TODO: mozda ovaj prvi nesmi bit ode
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private RatingRepository ratingRepository;

    @Override
    public List<Rating> getAllRatings() {
        return ratingRepository.findAll();
    }

    @Override
    public void addRating(Rating rating) {
        ratingRepository.save(rating);
    }

    @Override
    public Optional<Rating> getRatingById(Long id) {
        return ratingRepository.findById(id);
    }

    @Override
    public List<Rating> getRatingsByEmployeeId(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElse(null);
        return ratingRepository.findByEmployee(employee);
    }

    @Override
    public List<String> getNewRatings() {
        return ratingRepository.findNewest();
    }
}
