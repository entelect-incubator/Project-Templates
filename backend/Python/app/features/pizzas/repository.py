from dataclasses import dataclass
from typing import Dict, Optional
from uuid import uuid4


@dataclass
class Pizza:
    id: str
    name: str
    price: float


class PizzaRepository:
    async def create(self, name: str, price: float) -> Pizza:
        raise NotImplementedError

    async def get_by_id(self, pizza_id: str) -> Optional[Pizza]:
        raise NotImplementedError


class InMemoryPizzaRepository(PizzaRepository):
    def __init__(self) -> None:
        self._store: Dict[str, Pizza] = {}

    async def create(self, name: str, price: float) -> Pizza:
        pizza = Pizza(id=str(uuid4()), name=name, price=price)
        self._store[pizza.id] = pizza
        return pizza

    async def get_by_id(self, pizza_id: str) -> Optional[Pizza]:
        return self._store.get(pizza_id)


pizza_repository: PizzaRepository = InMemoryPizzaRepository()
