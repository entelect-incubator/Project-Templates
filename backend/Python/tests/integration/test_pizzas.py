import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_post_and_get():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        res = await ac.post("/pizzas", json={"name": "Test", "price": 9.5})
        assert res.status_code == 201
        created = res.json()

        res2 = await ac.get(f"/pizzas/{created['id']}")
        assert res2.status_code == 200
