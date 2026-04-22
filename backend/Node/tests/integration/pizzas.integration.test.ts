import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../../src/app";

// NOTE: This uses in-memory handlers; replace with test DB wiring as needed.

describe("pizzas API", () => {
	it("POST /pizzas creates", async () => {
		const res = await request(app).post("/pizzas").send({ name: "Test", price: 9.5 });
		expect(res.status).toBe(201);
	});

	it("GET /pizzas/:id returns validation_error on bad uuid", async () => {
		const res = await request(app).get("/pizzas/not-a-uuid");
		expect(res.status).toBe(400);
	});
});
