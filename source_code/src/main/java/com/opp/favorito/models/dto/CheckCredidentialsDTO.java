package com.opp.favorito.models.dto;

public class CheckCredidentialsDTO {
    private String username;
    private String password;
    private boolean admin;
    private boolean employee;
    private boolean client;

    //region constructors, getters and setters
    CheckCredidentialsDTO() {}

    public CheckCredidentialsDTO(String username, String password, boolean admin, boolean employee, boolean client) {
        this.username = username;
        this.password = password;
        this.admin = admin;
        this.employee = employee;
        this.client = client;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public boolean isEmployee() {
        return employee;
    }

    public void setEmployee(boolean employee) {
        this.employee = employee;
    }

    public boolean isClient() {
        return client;
    }

    public void setClient(boolean client) {
        this.client = client;
    }
    //endregion
}
