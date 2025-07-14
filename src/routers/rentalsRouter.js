import { Router } from "express";
import {
  getRentals,
  createRental,
  returnRental,
  deleteRental
} from "../controllers/rentalsController.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import { rentalSchema } from "../schemas/rentalsSchema.js";

const router = Router();

router.get("/", getRentals);
router.post("/", validateSchema(rentalSchema), createRental);
router.post("/:id/return", returnRental);
router.delete("/:id", deleteRental);

export default router;
