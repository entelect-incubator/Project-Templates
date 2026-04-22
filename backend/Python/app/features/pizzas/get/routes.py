from fastapi import APIRouter, HTTPException
from .dto import GetPizzaDto
from .handler import handle_get_pizza

router = APIRouter()

@router.get("/pizzas/{id}")
async def get_pizza(id: str):
    dto = GetPizzaDto(id=id)
    result = await handle_get_pizza(dto)
    if result.ok:
        return result.value
    if result.code == "validation_error":
        raise HTTPException(status_code=400, detail=result.message)
    if result.code == "not_found":
        raise HTTPException(status_code=404, detail=result.message)
    raise HTTPException(status_code=500, detail=result.message)
