package com.opp.favorito.models.dto;

import java.sql.Date;

public class CreateBreakDTO {
    private String employeeMail;
    private java.util.Date date;
    private String startTime;

    //region constructors, getters and setters
    public CreateBreakDTO() {}

    public CreateBreakDTO(String employeeId, Date date, String startTime) {
        this.employeeMail = employeeId;
        this.date = date;
        this.startTime = startTime;
    }

    public String getEmployeeMail() {
        return employeeMail;
    }

    public void setEmployeeMail(String employeeMail) {
        this.employeeMail = employeeMail;
    }

    public java.util.Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }
    //endregion
}
