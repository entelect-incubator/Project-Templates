import { describe, it, expect } from "vitest";
import { handleCreatePizza } from "../../src/features/pizzas/create/handler";

describe("handleCreatePizza", () => {
	it("returns validation_error when name missing", async () => {
		const res = await handleCreatePizza({ price: 10 });
		expect(res.ok).toBe(false);
		if (!res.ok) expect(res.code).toBe("validation_error");
	});

	it("returns ok for valid input", async () => {
		const res = await handleCreatePizza({ name: "Margherita", price: 12 });
		expect(res.ok).toBe(true);
	});
});
