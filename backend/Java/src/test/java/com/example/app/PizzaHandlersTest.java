package com.example.app;

import com.example.app.features.pizza.InMemoryPizzaRepository;
import com.example.app.features.pizza.create.CreatePizzaHandler;
import com.example.app.features.pizza.create.CreatePizzaRequest;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class PizzaHandlersTest {
    @Test
    void create_pizza_ok() {
        var handler = new CreatePizzaHandler(new InMemoryPizzaRepository());
        var result = handler.handle(new CreatePizzaRequest("Margherita", 10));
        assertThat(result).isInstanceOf(com.example.app.core.Result.Success.class);
    }
}
