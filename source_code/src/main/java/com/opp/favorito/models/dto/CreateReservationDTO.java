package com.opp.favorito.models.dto;

import java.util.Date;

public class CreateReservationDTO {
    private Long employeeId;
    private String clientMail;
    private String startTime;
    private java.util.Date date;

    //region constructors, getters and setters
    public CreateReservationDTO() {}

    public CreateReservationDTO(Long employeeId, String clientMail, String startTime, Date date) {
        this.employeeId = employeeId;
        this.clientMail = clientMail;
        this.startTime = startTime;
        this.date = date;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
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

    public java.util.Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    //endregion
}
