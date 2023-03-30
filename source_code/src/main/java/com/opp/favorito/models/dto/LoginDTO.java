package com.opp.favorito.models.dto;

//TODO: vidit jel mu dite registracija
public class LoginDTO {
    private String eMail;
    private String password;

    //region constructor, getters and setters
    public LoginDTO() {}

    public LoginDTO(String eMail, String password) {
        this.eMail = eMail;
        this.password = password;
    }

    public String geteMail() {
        return eMail;
    }

    public void seteMail(String eMail) {
        this.eMail = eMail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    //endregion
}
