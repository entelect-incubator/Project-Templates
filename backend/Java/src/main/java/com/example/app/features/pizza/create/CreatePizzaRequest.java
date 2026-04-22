package com.example.app.features.pizza.create;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record CreatePizzaRequest(@NotBlank String name, @Min(1) double price) {}
