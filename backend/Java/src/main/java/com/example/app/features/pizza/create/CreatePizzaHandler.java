package com.example.app.features.pizza.create;

import com.example.app.core.Result;
import com.example.app.features.pizza.PizzaRepository;
import org.springframework.stereotype.Service;

@Service
public class CreatePizzaHandler {
    private final PizzaRepository repository;

    public CreatePizzaHandler(PizzaRepository repository) {
        this.repository = repository;
    }

    public Result<?> handle(CreatePizzaRequest request) {
        var pizza = repository.save(request.name(), request.price());
        return Result.ok(new CreatePizzaResponse(pizza.id(), pizza.name(), pizza.price()));
    }
}

record CreatePizzaResponse(String id, String name, double price) {}
