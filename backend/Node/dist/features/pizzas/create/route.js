import { Router } from "express";
import { handleCreatePizza } from "./handler";
const router = Router();
router.post("/pizzas", async (req, res, next) => {
    const result = await handleCreatePizza(req.body).catch((err) => next(err));
    if (!result)
        return;
    if (!result.ok) {
        const status = result.code === "validation_error" ? 400 : 400;
        return res.status(status).json(result);
    }
    return res.status(201).json(result.value);
});
export { router as pizzaCreateRoute };
