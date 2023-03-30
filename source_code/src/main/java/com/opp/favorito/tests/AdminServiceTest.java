package com.opp.favorito.tests;

import com.opp.favorito.models.Admin;
import com.opp.favorito.models.Location;
import com.opp.favorito.repository.AdminRepository;
import com.opp.favorito.repository.LocationRepository;
import com.opp.favorito.services.AdminService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;

import java.util.List;
import java.util.Optional;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
public class AdminServiceTest {

    @Mock
    AdminRepository adminRepository;

    @InjectMocks
    AdminService adminService;

    @Before
    public void setUp() throws Exception {

    }

    @Test
    public void getAdminByIdTest() {
        Optional<Admin> adminFromDatabase = Optional.of(new Admin("a@a", "123"));
        Mockito.when(adminRepository.findById(new Long("1"))).thenReturn(adminFromDatabase);
        Assert.assertEquals(adminFromDatabase, adminService.getAdminById(new Long("1")));

        Mockito.verify(adminRepository).findById(new Long("1"));
    }

}
