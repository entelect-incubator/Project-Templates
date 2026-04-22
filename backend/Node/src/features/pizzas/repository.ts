export type Pizza = {
	id: string;
	name: string;
	price: number;
};

export interface PizzaRepository {
	create(input: Omit<Pizza, "id">): Promise<Pizza>;
	getById(id: string): Promise<Pizza | null>;
}

class InMemoryPizzaRepository implements PizzaRepository {
	private readonly store = new Map<string, Pizza>();

	async create(input: Omit<Pizza, "id">): Promise<Pizza> {
		const pizza: Pizza = { id: crypto.randomUUID(), ...input };
		this.store.set(pizza.id, pizza);
		return pizza;
	}

	async getById(id: string): Promise<Pizza | null> {
		return this.store.get(id) ?? null;
	}
}

export const pizzaRepository: PizzaRepository = new InMemoryPizzaRepository();
