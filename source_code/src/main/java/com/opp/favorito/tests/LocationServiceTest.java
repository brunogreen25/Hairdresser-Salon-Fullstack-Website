package com.opp.favorito.tests;

import com.opp.favorito.models.Admin;
import com.opp.favorito.models.Location;
import com.opp.favorito.repository.AdminRepository;
import com.opp.favorito.repository.LocationRepository;
import com.opp.favorito.services.AdminService;
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

import java.util.Optional;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
public class LocationServiceTest {
    @Mock
    LocationRepository locationRepository;

    @InjectMocks
    LocationService locationService;

    @Before
    public void setUp() throws Exception {

    }

    @Test
    public void getLocationByAddressAndCity() {
        Optional<Location> locationFromDatabase = Optional.of(new Location(new Long("3"), "Jarunska ulica 2", "Zagreb"));
        Mockito.when(locationRepository.findByAddressAndCity("Jarunska ulica 2", "Zagreb")).thenReturn(locationFromDatabase);
        Assert.assertEquals(locationFromDatabase.get(), locationService.getLocationByAddressAndCity("Jarunska ulica 2", "Zagreb"));

        Mockito.verify(locationRepository).findByAddressAndCity("Jarunska ulica 2", "Zagreb");
    }
}
