package com.example.app.features.pizza.create;

import com.example.app.core.Result;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CreatePizzaController {
    private final CreatePizzaHandler handler;

    public CreatePizzaController(CreatePizzaHandler handler) {
        this.handler = handler;
    }

    @PostMapping("/pizzas")
    public ResponseEntity<?> create(@Valid @RequestBody CreatePizzaRequest request) {
        var result = handler.handle(request);
        if (result instanceof Result.Success<?> s) {
            return ResponseEntity.status(201).body(s.value());
        }
        if (result instanceof Result.Failure f) {
            return ResponseEntity.badRequest().body(f);
        }
        return ResponseEntity.internalServerError().build();
    }
}
