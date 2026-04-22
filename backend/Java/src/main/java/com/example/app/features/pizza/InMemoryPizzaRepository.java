package com.example.app.features.pizza;

import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class InMemoryPizzaRepository implements PizzaRepository {
    private final Map<String, Pizza> store = new ConcurrentHashMap<>();

    @Override
    public Pizza save(String name, double price) {
        var pizza = new Pizza(UUID.randomUUID().toString(), name, price);
        store.put(pizza.id(), pizza);
        return pizza;
    }

    @Override
    public Optional<Pizza> findById(String id) {
        return Optional.ofNullable(store.get(id));
    }
}
