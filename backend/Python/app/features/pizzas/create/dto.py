from pydantic import BaseModel, Field

class CreatePizzaDto(BaseModel):
    name: str = Field(min_length=1)
    price: float = Field(gt=0)
