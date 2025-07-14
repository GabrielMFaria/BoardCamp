import { Router } from "express";
import gamesRouter from "./gamesRouter.js";
import customersRouter from "./customersRouter.js";
import rentalsRouter from "./rentalsRouter.js";

const router = Router();

router.use("/games", gamesRouter);
router.use("/customers", customersRouter);
router.use("/rentals", rentalsRouter);

export default router;
