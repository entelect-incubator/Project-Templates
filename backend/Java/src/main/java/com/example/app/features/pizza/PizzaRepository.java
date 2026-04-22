package com.example.app.features.pizza;

import java.util.Optional;

public interface PizzaRepository {
    Pizza save(String name, double price);
    Optional<Pizza> findById(String id);
}
