package com.opp.favorito.models.dto;

public class RegistrateClientDTO {
    private String eMail;
    private String name;
    private String surname;
    private String password;
    private String reccomendationEmail;

    //region constructors, getters and setters
    public RegistrateClientDTO() {}

    public RegistrateClientDTO(String eMail, String name, String surname, String password, String reccomendationEmail) {
        this.eMail = eMail;
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.reccomendationEmail = reccomendationEmail;
    }

    public String geteMail() {
        return eMail;
    }

    public void seteMail(String eMail) {
        this.eMail = eMail;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getReccomendationEmail() {
        return reccomendationEmail;
    }

    public void setReccomendationEmail(String reccomendationEmail) {
        this.reccomendationEmail = reccomendationEmail;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }
    //endregion
}
