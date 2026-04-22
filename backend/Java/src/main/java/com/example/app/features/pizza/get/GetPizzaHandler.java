package com.example.app.features.pizza.get;

import com.example.app.core.Result;
import com.example.app.features.pizza.PizzaRepository;
import org.springframework.stereotype.Service;

@Service
public class GetPizzaHandler {
    private final PizzaRepository repository;

    public GetPizzaHandler(PizzaRepository repository) {
        this.repository = repository;
    }

    public Result<?> handle(GetPizzaRequest request) {
        return repository
            .findById(request.id())
            .<Result<?>>map(pizza -> Result.ok(new GetPizzaResponse(pizza.id(), pizza.name(), pizza.price())))
            .orElseGet(() -> Result.fail("not_found", "Pizza not found"));
    }
}

record GetPizzaResponse(String id, String name, double price) {}
