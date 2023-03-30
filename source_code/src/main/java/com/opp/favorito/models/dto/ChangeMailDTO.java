package com.opp.favorito.models.dto;

public class ChangeMailDTO {
    private boolean sendMail;
    private String employeeUsername;

    //region constructors, getters and setters
    public ChangeMailDTO() {}

    public ChangeMailDTO(boolean sendMail, String employeeUsername) {
        this.sendMail = sendMail;
        this.employeeUsername = employeeUsername;
    }

    public boolean isSendMail() {
        return sendMail;
    }

    public void setSendMail(boolean sendMail) {
        this.sendMail = sendMail;
    }

    public String getEmployeeUsername() {
        return employeeUsername;
    }

    public void setEmployeeUsername(String employeeUsername) {
        this.employeeUsername = employeeUsername;
    }
    //endregion
}
