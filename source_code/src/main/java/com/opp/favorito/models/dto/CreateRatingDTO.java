package com.opp.favorito.models.dto;

public class CreateRatingDTO {
    private String employeeEMail;
    private String clientEMail;
    private String comment;
    private Double grade;

    //region constructors, getters and setters
    public CreateRatingDTO() {}

    public CreateRatingDTO(String employeeEMail, String clientEMail, String comment, Double grade) {
        this.employeeEMail = employeeEMail;
        this.clientEMail = clientEMail;
        this.comment = comment;
        this.grade = grade;
    }

    public String getEmployeeEMail() {
        return employeeEMail;
    }

    public void setEmployeeEMail(String employeeEMail) {
        this.employeeEMail = employeeEMail;
    }

    public String getClientEMail() {
        return clientEMail;
    }

    public void setClientEMail(String clientEMail) {
        this.clientEMail = clientEMail;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Double getGrade() {
        return grade;
    }

    public void setGrade(Double grade) {
        this.grade = grade;
    }
    //endregion
}

