package com.opp.favorito.models;

import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.util.Calendar;

@Entity
@Table(uniqueConstraints={
        @UniqueConstraint(columnNames={"employee_employee_id", "date", "start_time"}),
        @UniqueConstraint(columnNames={"client_client_id", "date", "start_time"})
})
public class Reservation {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Employee employee;

    @Temporal(TemporalType.DATE)
    @Column(name = "date", nullable = false)
    private java.util.Date date;

    @Temporal(TemporalType.TIME)
    @Column(name = "start_time", nullable = false)
    private java.util.Date startTime;

    @ManyToOne
    private Client client;

    //region constructors, getters and setters
    public Reservation() {}

    public Reservation(Employee employee, java.util.Date date, java.util.Date startTime, Client client) {
        this.employee = employee;
        this.date = date;
        this.startTime = startTime;
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

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public java.util.Date getDate() {
        return date;
    }

    public void setDate(java.util.Date date) {
        this.date = date;
    }

    public java.util.Date getStartTime() {
        return startTime;
    }

    public void setStartTime(java.util.Date startTime) {
        this.startTime = startTime;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
    //endregion
}
