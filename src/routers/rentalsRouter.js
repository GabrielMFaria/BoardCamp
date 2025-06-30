import { Router } from "express";
import {
  getRentals,
  postRental,
  returnRental,
  deleteRental
} from "../controllers/rentalsController.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import { rentalSchema } from "../schemas/rentalsSchema.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", validateSchema(rentalSchema), postRental);
router.post("/rentals/:id/return", returnRental);
router.delete("/rentals/:id", deleteRental);

export default router;
