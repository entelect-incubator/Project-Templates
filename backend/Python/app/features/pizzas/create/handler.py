from .dto import CreatePizzaDto
from ....core.result import ok, err, Result
from ..repository import PizzaRepository, pizza_repository

async def handle_create_pizza(dto: CreatePizzaDto, repository: PizzaRepository = pizza_repository) -> Result:
    created = await repository.create(name=dto.name, price=dto.price)
    return ok({"id": created.id, "name": created.name, "price": created.price})
