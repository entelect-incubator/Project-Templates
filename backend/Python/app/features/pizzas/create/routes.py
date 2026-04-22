from fastapi import APIRouter, HTTPException
from .dto import CreatePizzaDto
from .handler import handle_create_pizza

router = APIRouter()

@router.post("/pizzas", status_code=201)
async def create_pizza(dto: CreatePizzaDto):
    result = await handle_create_pizza(dto)
    if result.ok:
        return result.value
    if result.code == "validation_error":
        raise HTTPException(status_code=400, detail=result.message)
    raise HTTPException(status_code=500, detail=result.message)
