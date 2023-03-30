package com.opp.favorito.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(uniqueConstraints={
        @UniqueConstraint(columnNames={"address", "city"}),
})
public class Location {
    @Id
    @GeneratedValue
    @Column(name = "location_id")
    private Long id;

    @Column(nullable = false)
    private String address;

    @Column
    private String city;

    public Location() {

    }

    //region constructors, getters and setters
    public Location(Long id, String address, String city) {
        this.id = id;
        this.address = address;
        this.city = city;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setCity(String city) {
        this.city = city;
    }


    public Long getId() {
        return id;
    }

    public String getAddress() {
        return address;
    }

    public String getCity() {
        return city;
    }
    //endregion
}
