package com.opp.favorito.controllers;

import com.opp.favorito.models.Client;
import com.opp.favorito.models.Employee;
import com.opp.favorito.models.Reservation;
import com.opp.favorito.models.dto.CreateBreakDTO;
import com.opp.favorito.models.dto.CreateReservationDTO;
import com.opp.favorito.services.ClientService;
import com.opp.favorito.services.EmployeeService;
import com.opp.favorito.services.ReservationService;
import com.opp.favorito.services.interfaces.ClientServiceInterface;
import com.opp.favorito.services.interfaces.EmployeeServiceInterface;
import com.opp.favorito.services.interfaces.ReservationServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rest/reservations")
public class ReservationController {
    @Autowired
    private ReservationServiceInterface reservationService;

    @Autowired
    private EmployeeServiceInterface employeeService;

    @Autowired
    private ClientServiceInterface clientService;

    @GetMapping("")
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations());
    }

    @GetMapping("/clientMail:{clientMail}")
    public ResponseEntity<List<Reservation>> getReservationByClientMail(@PathVariable String clientMail) {
        Client client = clientService.getClientByEmail(clientMail).orElse(null);
        if(client == null) {
            return ResponseEntity.notFound().build();
        }

        List<Reservation> reservations = reservationService.getReservationByClient(client);
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservation(@PathVariable Long id) {
        Optional<Reservation> reservation = reservationService.getReservationById(id);
        if (reservation.isPresent()) {
            return ResponseEntity.ok(reservation.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/schedule/{employeeUsername}/{date}")
    public ResponseEntity<List<Reservation>> getReservationByEmployee(@PathVariable String employeeUsername, @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) java.util.Date date) {
        Optional<Employee> optEmployee = employeeService.getEmployeeByEmail(employeeUsername);

        if(!optEmployee.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Employee employee = optEmployee.get();
        List<Reservation> reservationList = reservationService.getByEmployeeAndDate(employee, date);

        return ResponseEntity.ok(reservationList);
    }

    @PostMapping("")
    public ResponseEntity<Void> addReservation(@RequestBody Reservation reservation) {
        reservationService.addReservation(reservation);
        return ResponseEntity.ok().build();
    }

    /*
    @PostMapping("/pdf")
    public ResponseEntity<Void>  pdfGenerator(@RequestBody CreateReservationPdfDTO createReservationPdfDTO) {
        Reservation res = reservationService.createReservation((long) 1.0, createReservationPdfDTO.getDate(), createReservationPdfDTO.getStartTime(), createReservationPdfDTO.getClientMail());
        if (res != null) {

            System.out.println("OK");
        }
        return ResponseEntity.ok().build();
    }

*/


    @Autowired
    MailController mailController;

    //frontend smije omogucit da se klikne samo na prazan termin
    @PostMapping("/new")
    public ResponseEntity<Reservation> createReservation(@RequestBody CreateReservationDTO createReservationDTO) {
        Reservation res = reservationService.createReservation(createReservationDTO.getEmployeeId(), createReservationDTO.getDate(), createReservationDTO.getStartTime(), createReservationDTO.getClientMail());
        if (res != null) {
            mailController.sendMail(res);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    //break se sprema u bazu isto kao i rezervacija, ali je client id = null (na frontendu je da omoguci da klikne na prazan termin)
    @PostMapping("/break")
    public ResponseEntity<Reservation> addBreak(@RequestBody CreateBreakDTO dto) {
        Reservation res = reservationService.addBreak(dto.getEmployeeMail(), dto.getDate(), dto.getStartTime());
        if (res == null) {
            return  ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    //TODO: kako je moguce da ovo radi?; izbrisi?
    //{date} mora bit yyyy-MM-dd format
    /*@GetMapping("/schedule")
    public ResponseEntity<List<Reservation>> getOnDate(@RequestBody EmployeeScheduleDTO dto) {
        List<Reservation> reservations = reservationService.getByEmployeeIdAndDate(dto.getEmployeeId(), dto.getDate());
        return ResponseEntity.ok(reservations);
    }*/
}
