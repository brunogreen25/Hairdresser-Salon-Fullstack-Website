package com.opp.favorito.models.dto;

public class RegistrateEmployeeDTO {
    private String email;
    private String name;
    private String surname;
    private String address;

    //region constructors, getters and setters
    public RegistrateEmployeeDTO()  {}

    public RegistrateEmployeeDTO(String email, String name, String surname, String address) {
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.address = address;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
    //endregion
}
