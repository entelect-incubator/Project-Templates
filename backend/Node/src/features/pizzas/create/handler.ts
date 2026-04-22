import { z } from "zod";
import { ok, fail, Result } from "../../../core/result";
import { PizzaRepository, pizzaRepository } from "../repository";

const schema = z.object({
	name: z.string().min(1),
	price: z.number().positive(),
});

export async function handleCreatePizza(cmd: unknown, repository: PizzaRepository = pizzaRepository): Promise<Result<{ id: string }>> {
	const parsed = schema.safeParse(cmd);
	if (!parsed.success) {
		return fail("validation_error", parsed.error.errors[0]?.message || "Invalid input");
	}

	const created = await repository.create({ name: parsed.data.name, price: parsed.data.price });
	return ok({ id: created.id });
}
