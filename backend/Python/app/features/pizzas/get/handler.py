from .dto import GetPizzaDto
from ....core.result import ok, err, Result
from ..repository import PizzaRepository, pizza_repository

async def handle_get_pizza(dto: GetPizzaDto, repository: PizzaRepository = pizza_repository) -> Result:
    pizza = await repository.get_by_id(dto.id)
    if not pizza:
        return err("not_found", "Pizza not found")

    return ok({"id": pizza.id, "name": pizza.name, "price": pizza.price})
