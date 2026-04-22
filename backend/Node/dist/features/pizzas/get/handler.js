import { ok, fail } from "../../../core/result";
import { z } from "zod";
import { pizzaRepository } from "../repository";
const schema = z.object({ id: z.string().uuid() });
export async function handleGetPizza(q, repository = pizzaRepository) {
    const parsed = schema.safeParse(q);
    if (!parsed.success)
        return fail("validation_error", parsed.error.errors[0]?.message || "Invalid id");
    const pizza = await repository.getById(parsed.data.id);
    if (!pizza)
        return fail("not_found", "Pizza not found");
    return ok(pizza);
}
