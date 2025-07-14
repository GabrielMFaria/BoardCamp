import { Router } from "express";
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer
} from "../controllers/customersController.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import { customerSchema } from "../schemas/customersSchema.js";

const router = Router();

router.get("/", getCustomers);
router.get("/:id", getCustomerById);
router.post("/", validateSchema(customerSchema), createCustomer);
router.put("/:id", validateSchema(customerSchema), updateCustomer);

export default router;
