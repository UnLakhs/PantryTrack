package com.apostolos.backend.controller;

import com.apostolos.backend.dto.FoodItemRequest;
import com.apostolos.backend.dto.FoodItemResponse;
import com.apostolos.backend.service.FoodItemService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class FoodItemController {
    private final FoodItemService foodItemService;

    public FoodItemController(FoodItemService foodItemService) {
        this.foodItemService = foodItemService;
    }

    @GetMapping
    public List<FoodItemResponse> getFoodItems() {
        return foodItemService.getFoodItems();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FoodItemResponse addFoodItem(@Valid @RequestBody FoodItemRequest request) {
        return foodItemService.addFoodItem(request);
    }

    @GetMapping("/search")
    public List<FoodItemResponse> searchFoodItem(@RequestParam String search) {
        return foodItemService.searchFoodItems(search);
    }
}
