package com.apostolos.backend.dto;

import com.apostolos.backend.model.StorageLocation;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

// Request DTO: fields the frontend is allowed to send when creating a food item.
public record FoodItemRequest(
        @NotBlank(message = "Name is required")
        String name,

        @NotBlank(message = "Category is required")
        String category,

        @NotBlank(message = "Quantity is required")
        String quantity,

        @NotNull(message = "Expiration date is required")
        @FutureOrPresent(message = "Expiration date cannot be in the past")
        LocalDate expirationDate,

        @NotNull(message = "Storage location is required")
        StorageLocation storageLocation,

        String notes
) {
}
