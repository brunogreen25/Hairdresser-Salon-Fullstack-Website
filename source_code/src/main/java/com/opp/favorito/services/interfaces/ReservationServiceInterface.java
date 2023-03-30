package com.opp.favorito.services.interfaces;

import com.opp.favorito.models.Client;
import com.opp.favorito.models.Employee;
import com.opp.favorito.models.Reservation;
import com.opp.favorito.repository.ReservationRepository;
import com.opp.favorito.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public interface ReservationServiceInterface {

    public List<Reservation> getAllReservations();

    public void addReservation(Reservation reservation);

    public List<Reservation> getByEmployee(Employee employee);

    public List<Reservation> getReservationByClient(Client client);

    public Optional<Reservation> getReservationById(Long id);

    public Reservation createReservation(Long employeeId, Date date, String time, String clientMail);

    public Reservation addBreak(String employeeMail, Date date, String time);

    public List<Reservation> getByEmployeeAndDate(Employee employee, Date date);

}
