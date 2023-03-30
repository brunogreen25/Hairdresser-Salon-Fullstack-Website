package com.opp.favorito.models.dto;


import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class LombokExample {
    private String title;
    private String description;
    private Integer volumes;
    private Double score;
}
