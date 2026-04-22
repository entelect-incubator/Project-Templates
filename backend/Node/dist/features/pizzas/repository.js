class InMemoryPizzaRepository {
    constructor() {
        this.store = new Map();
    }
    async create(input) {
        const pizza = { id: crypto.randomUUID(), ...input };
        this.store.set(pizza.id, pizza);
        return pizza;
    }
    async getById(id) {
        return this.store.get(id) ?? null;
    }
}
export const pizzaRepository = new InMemoryPizzaRepository();
