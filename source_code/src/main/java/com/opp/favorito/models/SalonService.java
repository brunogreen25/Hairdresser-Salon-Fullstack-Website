package com.opp.favorito.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class SalonService {
    @Id
    @GeneratedValue
    @Column(name = "salonService_id")
    private Long id;
    @Column(unique = true, nullable = false)
    private String name;
    @Column(nullable = false)
    private Double price;

    /*@ManyToMany
    @JoinTable(name = "employees_favours_table",
            joinColumns = @JoinColumn(referencedColumnName = "favour_id"),
            inverseJoinColumns = @JoinColumn(referencedColumnName = "employee_id")
    )*/

    @ManyToMany (mappedBy = "salonServices")
    @JsonIgnore
    private Set<Employee> employees = new HashSet<>();

    //region constructors, getters and setters
    public SalonService() {}

    public SalonService(String name, Double price, Set<Employee> employees) {
        this.name = name;
        this.price = price;
        this.employees = employees;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
    }
    //endregion
}
