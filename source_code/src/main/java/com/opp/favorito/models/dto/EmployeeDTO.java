package com.opp.favorito.models.dto;

import com.opp.favorito.models.Location;
import com.opp.favorito.models.SalonService;

import java.util.HashSet;
import java.util.Set;

public class EmployeeDTO {
    private Long id;
    private String email;
    private String name;
    private String surname;
    private int sendMail;
    private Location location;

    private Set<SalonService> salonServices = new HashSet<>();

    //region constructors, getters and setters
    public EmployeeDTO(){

    }

    public EmployeeDTO(String email, String name, String surname, String password, Location location, Set<SalonService> salonServices, int sendMail) {
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.location = location;
        this.salonServices = salonServices;
        this.sendMail = sendMail;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Set<SalonService> getSalonServices() {
        return salonServices;
    }

    public void setSalonServices(Set<SalonService> salonServices) {
        this.salonServices = salonServices;
    }

    public int isSendMail() {
        return sendMail;
    }

    public void setSendMail(int sendMail) {
        this.sendMail = sendMail;
    }
    //endregion
}
