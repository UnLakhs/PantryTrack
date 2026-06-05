package com.apostolos.backend.service;

import com.apostolos.backend.dto.FoodItemRequest;
import com.apostolos.backend.dto.FoodItemResponse;
import com.apostolos.backend.model.FoodItem;
import com.apostolos.backend.repository.FoodItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodItemService {
    private final FoodItemRepository foodItemRepository;

    public FoodItemService(FoodItemRepository foodItemRepository) {
        this.foodItemRepository = foodItemRepository;
    }

    public List<FoodItemResponse> getFoodItems() {
        return foodItemRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public FoodItemResponse addFoodItem(FoodItemRequest request) {
        FoodItem foodItem = new FoodItem();

        foodItem.setName(request.name());
        foodItem.setCategory(request.category());
        foodItem.setQuantity(request.quantity());
        foodItem.setExpirationDate(request.expirationDate());
        foodItem.setStorageLocation(request.storageLocation());
        foodItem.setNotes(request.notes());

        FoodItem savedFoodItem = foodItemRepository.save(foodItem);

        return mapToResponse(savedFoodItem);
    }

    //search
    public List<FoodItemResponse> searchFoodItems(String search) {
        return foodItemRepository.findByNameContainingIgnoreCase(search)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // Keep API responses separate from the JPA entity shape.
    private FoodItemResponse mapToResponse(FoodItem foodItem) {
        return new FoodItemResponse(
                foodItem.getId(),
                foodItem.getName(),
                foodItem.getCategory(),
                foodItem.getQuantity(),
                foodItem.getExpirationDate(),
                foodItem.getStorageLocation(),
                foodItem.getNotes(),
                foodItem.getCreatedAt(),
                foodItem.getUpdatedAt()
        );
    }
}
