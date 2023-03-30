package com.opp.favorito.models.dto;

public class PasswordDTO {
    private String password;

    //region constructors, getters and setters
    public PasswordDTO() {}

    public PasswordDTO(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    //endregion
}
