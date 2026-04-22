import { Router } from "express";
import { handleGetPizza } from "./handler";
const router = Router();
router.get("/pizzas/:id", async (req, res, next) => {
    const result = await handleGetPizza({ id: req.params.id }).catch((err) => next(err));
    if (!result)
        return;
    if (!result.ok) {
        const status = result.code === "validation_error" ? 400 : result.code === "not_found" ? 404 : 400;
        return res.status(status).json(result);
    }
    return res.status(200).json(result.value);
});
export { router as pizzaGetRoute };
