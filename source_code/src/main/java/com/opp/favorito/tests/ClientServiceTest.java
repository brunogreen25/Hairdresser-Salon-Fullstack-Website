package com.opp.favorito.tests;

import com.opp.favorito.models.Client;
import com.opp.favorito.models.Location;
import com.opp.favorito.repository.ClientRepository;
import com.opp.favorito.repository.LocationRepository;
import com.opp.favorito.services.ClientService;
import com.opp.favorito.services.LocationService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyString;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
public class ClientServiceTest {
    @Mock
    ClientRepository clientRepository;

    @InjectMocks
    ClientService clientService;

    @Before
    public void setUp() throws Exception {

    }

    @Test
    public void getClientByEmailTest() {
        Optional<Client> clientFromDatabase = Optional.of(new Client( "c@c", "clientName", "clientSurname", "123", 0, 0));
        Mockito.when(clientRepository.findByEmail(anyString())).thenReturn(clientFromDatabase);
        Assert.assertEquals(clientFromDatabase, clientService.getClientByEmail("c@c"));

        Mockito.verify(clientRepository).findByEmail(anyString());
    }

    @Test
    public void getClientByIdTest() {
        Optional<Client> clientFromDatabase = Optional.of(new Client("c@c", "clientName", "clientSurname", "123", 0, 0));
        Mockito.when(clientRepository.findById(new Long("1"))).thenReturn(clientFromDatabase);
        Assert.assertEquals(clientFromDatabase, clientService.getClientById(new Long("1")));

        Mockito.verify(clientRepository).findById(new Long("1"));
    }
}
