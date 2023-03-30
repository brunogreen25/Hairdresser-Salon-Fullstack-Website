package com.opp.favorito.models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Rating {
    @Id
    @GeneratedValue
    @Column(name = "rating_id")
    private Long id;

    @ManyToOne
    private Employee employee;

    @Column(nullable = false)
    private Double grade;

    @Column
    private String comment;

    @ManyToOne
    private Client client;

    //region constructor, getters and setters
    public Rating() {}

    public Rating(Employee employee, Double grade, String comment, Client client) {
        this.employee = employee;
        this.grade = grade;
        this.comment = comment;
        this.client = client;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployeeId(Employee employee) {
        this.employee = employee;
    }

    public Double getGrade() {
        return grade;
    }

    public void setGrade(Double grade) {
        this.grade = grade;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
    //endregion
}
