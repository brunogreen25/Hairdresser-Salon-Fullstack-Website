package com.opp.favorito.tests;

import com.opp.favorito.models.*;
import com.opp.favorito.repository.ClientRepository;
import com.opp.favorito.repository.ReservationRepository;
import com.opp.favorito.services.ClientService;
import com.opp.favorito.services.ReservationService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.mockito.ArgumentMatchers.anyString;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
public class ReservationServiceTest {
    @Mock
    ReservationRepository reservationRepository;

    @InjectMocks
    ReservationService reservationService;

    private Client client;
    private Employee employee;

    @Before
    public void setUp() throws Exception {
        Location location = new Location(new Long("1"), "Jarunska ulica 2", "Zagreb");

        Set<SalonService> salonServices = new HashSet<>();
        salonServices.add(new SalonService());
        salonServices.add(new SalonService());

        reservationService = new ReservationService();
        client = new Client("c@c", "clientName", "clientSurname", "123", 0, 0);
        employee = new Employee("e@e", "employeeName", "employeeSurname", "123", location, salonServices, 1);
    }

    @Test
    public void getReservationById() {
        Optional<Reservation> reservationFromDatabase = Optional.of(new Reservation(employee, new Date("1.1.2019."), new Date("15:00:00"), client));
        Optional<Reservation> wrongReservation = Optional.of(new Reservation(employee, new Date("1.1.2020."), new Date("16:00:00"), client));

        Mockito.when(reservationRepository.findById(new Long("1"))).thenReturn(reservationFromDatabase);
        Assert.assertEquals(wrongReservation, reservationService.getReservationById(new Long("1")));

        Mockito.verify(reservationRepository).findById(new Long("1"));
    }
}
