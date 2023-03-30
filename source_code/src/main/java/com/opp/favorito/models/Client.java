package com.opp.favorito.models;

import javax.persistence.*;

@Entity
public class Client {

    @Id
    @GeneratedValue
    @Column(name = "client_id")
    private Long id;
    @Column(unique = true)
    private String email;
    private String name;
    private String surname;
    private String password;
    private int reservationsCounter;    //how many times he has used our services
    private int recomendationCounter;  //how many times he recommended our services to other users

    //region constructors, getters and setters
    public Client(){

    }

    public Client(String email, String name, String surname, String password, int reservationsCounter, int recomendationCounter) {
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.reservationsCounter = reservationsCounter;
        this.recomendationCounter = recomendationCounter;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getReservationsCounter() {
        return reservationsCounter;
    }

    public void setReservationsCounter(int reservationsCounter) {
        this.reservationsCounter = reservationsCounter;
    }

    public int getRecomendationCounter() {
        return recomendationCounter;
    }

    public void setRecomendationCounter(int recomendationCounter) {
        this.recomendationCounter = recomendationCounter;
    }
    //endregion
}
