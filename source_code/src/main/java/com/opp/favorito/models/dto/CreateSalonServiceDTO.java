package com.opp.favorito.models.dto;

public class CreateSalonServiceDTO {
    private String name;
    private Double price;

    //region constructors, getters and setters
    public CreateSalonServiceDTO() {}

    public CreateSalonServiceDTO(String name, Double price) {
        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
    //endregion
}
