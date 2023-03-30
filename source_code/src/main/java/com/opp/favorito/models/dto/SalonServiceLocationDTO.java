package com.opp.favorito.models.dto;

public class SalonServiceLocationDTO {
    private String salonServiceName;
    private String locationAddress;

    //region constructors, getters and setters
    public SalonServiceLocationDTO() {}

    public SalonServiceLocationDTO(String salonServiceName, String locationAddress) {
        this.salonServiceName = salonServiceName;
        this.locationAddress = locationAddress;
    }

    public String getSalonServiceName() {
        return salonServiceName;
    }

    public void setSalonServiceName(String salonServiceName) {
        this.salonServiceName = salonServiceName;
    }

    public String getLocationAddress() {
        return locationAddress;
    }

    public void setLocationAddress(String locationAddress) {
        this.locationAddress = locationAddress;
    }
    //endregion
}
