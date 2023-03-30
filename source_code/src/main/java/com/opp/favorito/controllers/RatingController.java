package com.opp.favorito.controllers;


import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.opp.favorito.models.Client;
import com.opp.favorito.models.Employee;
import com.opp.favorito.models.Rating;
import com.opp.favorito.models.dto.CreateRatingDTO;
import com.opp.favorito.services.ClientService;
import com.opp.favorito.services.EmployeeService;
import com.opp.favorito.services.RatingService;
import com.opp.favorito.services.interfaces.ClientServiceInterface;
import com.opp.favorito.services.interfaces.EmployeeServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rest/rating")
public class RatingController {
    @Autowired
    private RatingService ratingService;

    //vidit jel ova 2 Autowired-a mogu bit tu
    @Autowired
    private EmployeeServiceInterface employeeService;
    @Autowired
    private ClientServiceInterface clientService;

    @GetMapping("")
    public ResponseEntity<List<Rating>> getAllRatings() {
        return ResponseEntity.ok(ratingService.getAllRatings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rating> getRating(@PathVariable Long id) {
        Optional<Rating> rating = ratingService.getRatingById(id);
        if(!rating.isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(rating.get());
        }
    }

    @PostMapping("")
    public ResponseEntity<Void> addRating(@RequestBody Rating rating) {
        //da nedozvoli frontendu da stavlja ocjene koje nisu u intervalu [1,5]
        if(rating.getGrade()<1.0 || rating.getGrade()>5.0) {
            return ResponseEntity.badRequest().build();
        }
        ratingService.addRating(rating);
        System.out.println("Here");
        return ResponseEntity.ok().build();
    }

    @PostMapping("/create")
    public ResponseEntity<Void> addRating(@RequestBody CreateRatingDTO createRatingDTO) {
        //da nedozvoli frontendu da stavlja ocjene koje nisu u intervalu [1,5]
        if(createRatingDTO.getGrade()<1.0 || createRatingDTO.getGrade()>5.0) {
            System.out.println("Not here");
            return ResponseEntity.badRequest().build();
        }
        System.out.println("Here");

        Employee employee = employeeService.getEmployeeByEmail(createRatingDTO.getEmployeeEMail()).orElse(null);
        if(employee == null) {
            return ResponseEntity.badRequest().build();
        }

        Client client = clientService.getClientByEmail(createRatingDTO.getClientEMail()).orElse(null);
        if (client == null) {
            return ResponseEntity.badRequest().build();
        }

        Rating rating = new Rating(employee, createRatingDTO.getGrade(), createRatingDTO.getComment(), client);
        ratingService.addRating(rating);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/rating-number:{ratingNumber}")
    public ResponseEntity<List<String>> getNewRaitings(@PathVariable int ratingNumber) {
        List<String> ratings = ratingService.getNewRatings();

        if(!ratings.isEmpty() && ratingNumber < ratings.size()) {
            ratings = ratings.subList(0, ratingNumber);
        }

        return ResponseEntity.ok().body(ratings);
    }

    @GetMapping("/average-grade/employee-email:{employeeEmail}")
    public ResponseEntity<Double> getAverageGradeByEmployeeEmail(@PathVariable String employeeEmail) {
        Employee employee = employeeService.getEmployeeByEmail(employeeEmail).orElse(null);
        if (employee == null) {
            return ResponseEntity.badRequest().build();
        }

        List<Rating> ratingList = ratingService.getRatingsByEmployeeId(employee.getId());

        Double avg = getAverageGradeForEmployee(ratingList, employee.getId());
        return ResponseEntity.ok(avg);
    }

    @GetMapping("/employeeRating/{employeeEmail}")
    public ResponseEntity<List<Rating>> getRatingsByEmployeeId(@PathVariable String employeeEmail) {
        Employee employee = employeeService.getEmployeeByEmail(employeeEmail).orElse(null);
        if(employee == null) {
            return ResponseEntity.notFound().build();
        }

        List<Rating> ratingList = ratingService.getRatingsByEmployeeId(employee.getId());

        return ResponseEntity.ok(ratingList);
    }

    private Double getAverageGradeForEmployee(List<Rating> ratings, Long employeeId) {
        int counter = 0;
        Double sum = 0.0;
        Double averageGrade = 0.0;
        for(Rating r : ratings) {
            if(r.getEmployee().getId() == employeeId) {
                sum += r.getGrade();
                counter++;
            }
        }
        if(counter != 0) return sum / counter;
        else return 0.0;
    }
}
