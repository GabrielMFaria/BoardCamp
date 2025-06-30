import Joi from "joi";

export const customerSchema = Joi.object({
  name: Joi.string().trim().required(),
  phone: Joi.string()
    .pattern(/^\d{10,11}$/)
    .required(),
  cpf: Joi.string()
    .length(11)
    .pattern(/^\d+$/)
    .required()
});
