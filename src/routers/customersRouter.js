import { Router } from "express";
import { getCustomers, postCustomer, getCustomerById } from "../controllers/customersController.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import { customerSchema } from "../schemas/customersSchema.js";

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomerById);
router.post("/customers", validateSchema(customerSchema), postCustomer);

export default router;
