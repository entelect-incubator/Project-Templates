import pytest
from app.features.pizzas.create.dto import CreatePizzaDto
from app.features.pizzas.create.handler import handle_create_pizza

@pytest.mark.asyncio
async def test_validation_happens_at_dto_boundary():
    with pytest.raises(Exception):
        CreatePizzaDto(name="", price=10)

@pytest.mark.asyncio
async def test_ok():
    res = await handle_create_pizza(CreatePizzaDto(name="Margherita", price=10))
    assert res.ok
