package com.opp.favorito.repository;

import com.opp.favorito.models.Employee;
import com.opp.favorito.models.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    Optional<Rating> findById(Long id);

    @Query("select r from Rating r where :employee = r.employee")
    List<Rating> findByEmployee(@Param("employee")Employee employee);

    //TODO: probaj limit ako proradi
    @Query("select r.comment from Rating r order by id desc")
    List<String> findNewest();
}
