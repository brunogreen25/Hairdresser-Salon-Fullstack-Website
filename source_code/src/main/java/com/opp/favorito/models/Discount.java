package com.opp.favorito.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Discount {
    @Id
    @GeneratedValue
    private Long id;
    @Column(unique = true)
    private String type;
    private Double value;
    private int discountFrequency;

    //region constructors, getters and setters

    public Discount() {
    }

    public Discount(String type, Double value, int discountFrequency) {
        this.type = type;
        this.value = value;
        this.discountFrequency = discountFrequency;
    }

    public void setDiscountFrequency(int discountFrequency) {
        this.discountFrequency = discountFrequency;
    }

    public int getDiscountFrequency() {
        return this.discountFrequency;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    //endregion
}
