package com.opp.favorito.repository;

import com.opp.favorito.models.Client;
import com.opp.favorito.models.Employee;
import com.opp.favorito.models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    Optional<Reservation> findById(Long id);
    Optional<Reservation> findByEmployeeIdAndDateAndStartTime(Long employeeId, java.util.Date date, java.util.Date time);
    //List<Reservation> findAllByEmployeeIdAndDate(Long employeeId, java.util.Date date);

    List<Reservation> findAllByEmployee(Employee employee);

    List<Reservation> findAllByEmployeeAndDate(Employee employee, java.util.Date date);

    List<Reservation> findAllByDateAndEmployeeAndClient(java.util.Date date, Employee employee, Client client);

    List<Reservation> findAllByClient(Client client);
}
