package com.example.app.features.pizza.get;

import com.example.app.core.Result;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GetPizzaController {
    private final GetPizzaHandler handler;

    public GetPizzaController(GetPizzaHandler handler) {
        this.handler = handler;
    }

    @GetMapping("/pizzas/{id}")
    public ResponseEntity<?> get(@PathVariable String id) {
        var result = handler.handle(new GetPizzaRequest(id));
        if (result instanceof Result.Success<?> s) return ResponseEntity.ok(s.value());
        if (result instanceof Result.Failure f) {
            if ("not_found".equals(f.code())) {
                return ResponseEntity.status(404).body(f);
            }

            return ResponseEntity.badRequest().body(f);
        }
        return ResponseEntity.internalServerError().build();
    }
}
