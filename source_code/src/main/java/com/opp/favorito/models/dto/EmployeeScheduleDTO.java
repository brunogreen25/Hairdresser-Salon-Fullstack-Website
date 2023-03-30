package com.opp.favorito.models.dto;

import java.util.Date;

public class EmployeeScheduleDTO {
    private Long employeeId;
    private java.util.Date date;

    //region constructors, getters and setters
    public EmployeeScheduleDTO() {}

    public EmployeeScheduleDTO(Long employeeId, Date date) {
        this.employeeId = employeeId;
        this.date = date;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public java.util.Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    //endregion
}
