from pydantic import BaseModel, Field

class GetPizzaDto(BaseModel):
    id: str = Field(min_length=1)
