package com.apostolos.backend.dto;

import com.apostolos.backend.model.StorageLocation;

import java.time.LocalDate;
import java.time.LocalDateTime;

// Response DTO: fields the API sends back to the frontend after reading/saving an item.
public record FoodItemResponse(
        Long id,
        String name,
        String category,
        String quantity,
        LocalDate expirationDate,
        StorageLocation storageLocation,
        String notes,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
