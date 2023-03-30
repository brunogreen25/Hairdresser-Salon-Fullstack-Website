package com.opp.favorito.models;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Employee {

    @Id
    @GeneratedValue
    @Column(name = "employee_id")
    private Long id;

    @Column(unique = true)
    private String email;
    private String name;
    private String surname;
    private String password;
    private int sendMail;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    /*@ManyToMany (mappedBy = "employees", cascade = CascadeType.ALL)
    private Set<Favour> favours = new HashSet<>();*/

    @ManyToMany
    @JoinTable(name = "employees_salonServices_table",
            joinColumns = @JoinColumn(referencedColumnName = "employee_id"),
            inverseJoinColumns = @JoinColumn(referencedColumnName = "salonService_id")
    )
   /* @JoinTable(name = "employees_favours_table",
            joinColumns = @JoinColumn(referencedColumnName = "employee_id"),
            inverseJoinColumns = @JoinColumn(referencedColumnName = "favour_id")
    )*/
    // private Set<Favour> favours = new HashSet<>();

    private Set<SalonService> salonServices = new HashSet<>();

    //region constructors, getters and setters
    public Employee(){

    }

    public Employee(String email, String name, String surname, String password, Location location, Set<SalonService> salonServices, int sendMail) {
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.password = password;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
