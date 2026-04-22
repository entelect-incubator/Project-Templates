import { Router } from "express";
import { pizzaCreateRoute } from "./features/pizzas/create/route";
import { pizzaGetRoute } from "./features/pizzas/get/route";
const router = Router();
router.use(pizzaCreateRoute);
router.use(pizzaGetRoute);
export { router as routes };
