package com.apostolos.backend.dto;

import com.apostolos.backend.model.StorageLocation;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
