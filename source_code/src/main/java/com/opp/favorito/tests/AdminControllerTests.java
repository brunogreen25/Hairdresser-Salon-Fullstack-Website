package com.opp.favorito.tests;

import com.opp.favorito.controllers.AdminController;
import com.opp.favorito.models.Admin;

import com.opp.favorito.services.interfaces.AdminServiceInterface;
import org.junit.Before;
import org.junit.Test;

import org.mockito.InjectMocks;
import org.mockito.Mock;

import org.mockito.junit.MockitoJUnitRunner;
import org.junit.runner.RunWith;

import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
public class AdminControllerTests {

    @InjectMocks
    AdminController adminController;

    @Mock
    AdminServiceInterface adminService;

    @Before
    public void setup() throws Exception {

    }

    @Test
    public void adminGetIdTest() throws Exception {
        Optional<Admin> optionalAdmin = Optional.of(new Admin("a@a", "123"));
        when(adminService.getAdminById(new Long("1"))).thenReturn(optionalAdmin);
        Admin admin2 = adminController.getAdmin(new Long("1")).getBody();
        assertEquals(optionalAdmin.get(), admin2);
        verify(adminService).getAdminById(new Long("1"));
    }
}
