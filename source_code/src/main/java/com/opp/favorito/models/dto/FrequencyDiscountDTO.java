package com.opp.favorito.models.dto;

public class FrequencyDiscountDTO {
    private int frequency;
    private String percentage;

    //region constructors, getters and setters
    public FrequencyDiscountDTO() {}

    public FrequencyDiscountDTO(int frequency, String percentage) {
        this.frequency = frequency;
        this.percentage = percentage;
    }

    public int getFrequency() {
        return frequency;
    }

    public void setFrequency(int frequency) {
        this.frequency = frequency;
    }

    public String getPercentage() {
        return percentage;
    }

    public void setPercentage(String percentage) {
        this.percentage = percentage;
    }
    //endregion
}
