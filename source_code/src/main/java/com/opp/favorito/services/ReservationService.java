package com.opp.favorito.services;

import com.opp.favorito.models.Client;
import com.opp.favorito.models.Employee;
import com.opp.favorito.models.Reservation;
import com.opp.favorito.repository.ReservationRepository;
import com.opp.favorito.services.interfaces.ReservationServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService implements ReservationServiceInterface {
    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private ClientService clientService;

    @Override
    public List<Reservation> getAllReservations() {
        List<Reservation> reservations = reservationRepository.findAll();
        for(Reservation res : reservations) {
            res.getStartTime().setTime(res.getStartTime().getTime()- Long.valueOf("3600000"));
        }
        return reservations;
    }

    @Override
    public void addReservation(Reservation reservation) {
        reservationRepository.save(reservation);
    }

    @Override
    public List<Reservation> getByEmployee(Employee employee) {
        List<Reservation> reservations = reservationRepository.findAllByEmployee(employee);
        for(Reservation res : reservations) {
            res.getStartTime().setTime(res.getStartTime().getTime()- Long.valueOf("3600000"));
        }
        return reservations;
    }

    @Override
    public List<Reservation> getReservationByClient(Client client) {
        List<Reservation> reservations = reservationRepository.findAllByClient(client);
        for(Reservation res : reservations) {
            res.getStartTime().setTime(res.getStartTime().getTime()- Long.valueOf("3600000"));
        }
        return reservations;
    }

    @Override
    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }

    @Override
    public Reservation createReservation(Long employeeId, java.util.Date date, String time, String clientMail) {
        int time1 = Integer.parseInt(time.split(":")[0]) + 1;
        Date startTime = new Date(0, 0, 0, time1, 0);

        Client client = clientService.getClientByEmail(clientMail).orElse(null);
        if(client == null) {
            return null;
        }

        Employee employee = employeeService.getEmployeeById(employeeId).orElse(null);
        if(employee == null) {
            return null;
        }

        Reservation reservation = new Reservation(employee, date, startTime, client);
        Reservation resic = reservationRepository.save(reservation);
        return resic;
    }

    @Override
    public Reservation addBreak(String employeeMail, java.util.Date date, String time) {
        int time1 = Integer.parseInt(time.split(":")[0]) + 1;
        Date startTime = new Date(0, 0, 0, time1, 0);

        Employee employee = employeeService.getEmployeeByEmail(employeeMail).orElse(null);
        if(employee == null) {
            return null;
        }

        Reservation resBreak = new Reservation(employee, date, startTime, null);

        //ako postoji pauza za taj dan, neka ju obrise
        List<Reservation> breaksForThatDay = reservationRepository.findAllByDateAndEmployeeAndClient(date, employee, null);
        if(!breaksForThatDay.isEmpty()) {
            reservationRepository.delete(breaksForThatDay.get(0));
        }

        return reservationRepository.save(resBreak);
    }

    @Override
    public List<Reservation> getByEmployeeAndDate(Employee employee, java.util.Date date) {
        List<Reservation> reservations = reservationRepository.findAllByEmployeeAndDate(employee, date);
        for(Reservation res : reservations) {
            res.getStartTime().setTime(res.getStartTime().getTime()- Long.valueOf("3600000"));
        }
        return reservations;
    }

}
