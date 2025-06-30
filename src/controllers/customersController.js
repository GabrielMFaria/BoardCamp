import * as customersService from "../services/customersService.js";

export async function getCustomers(req, res, next) {
  try {
    const customers = await customersService.getAllCustomers();
    res.status(200).send(customers);
  } catch (error) {
    next(error);
  }
}

export async function postCustomer(req, res, next) {
  try {
    await customersService.createCustomer(req.body);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

export async function getCustomerById(req, res, next) {
  const { id } = req.params;

  try {
    const customer = await customersService.findCustomerById(id);

    if (!customer) {
      return res.status(404).send("Cliente não encontrado");
    }

    res.status(200).send(customer);
  } catch (error) {
    next(error);
  }
}