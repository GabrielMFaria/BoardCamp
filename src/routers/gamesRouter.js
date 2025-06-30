import { Router } from "express";
import { getGames, postGame } from "../controllers/gamesController.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import { gameSchema } from "../schemas/gamesSchema.js";

const router = Router();

router.get("/games", getGames);
router.post("/games", validateSchema(gameSchema), postGame);

export default router;
