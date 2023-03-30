package com.opp.favorito.models.dto;

import java.util.Date;

public class CreateReservationPdfDTO {
    private String employeeName;
    private String employeeSurname;
    private String clientMail;
    private String startTime;
    private Date date;

    public CreateReservationPdfDTO(String employeeName, String employeeSurname, String clientMail, String startTime, Date date) {
        this.employeeName = employeeName;
        this.employeeSurname = employeeSurname;
        this.clientMail = clientMail;
        this.startTime = startTime;
        this.date = date;
    }

    public CreateReservationPdfDTO() {
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getEmployeeSurname() {
        return employeeSurname;
    }

    public void setEmployeeSurname(String employeeSurname) {
        this.employeeSurname = employeeSurname;
    }

    public String getClientMail() {
        return clientMail;
    }

    public void setClientMail(String clientMail) {
        this.clientMail = clientMail;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
