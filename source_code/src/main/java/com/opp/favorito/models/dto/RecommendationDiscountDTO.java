package com.opp.favorito.models.dto;

public class RecommendationDiscountDTO {
    private String percentage;

    //region constructors, getters and setters
    public RecommendationDiscountDTO() {}

    public RecommendationDiscountDTO(String percentage) {
        this.percentage = percentage;
    }

    public String getPercentage() {
        return percentage;
    }

    public void setPercentage(String percentage) {
        this.percentage = percentage;
    }
    //endregion
}
