import * as rentalsService from "../services/rentalsService.js";

export async function getRentals(req, res, next) {
  try {
    const rentals = await rentalsService.getAllRentals();
    res.status(200).send(rentals);
  } catch (error) {
    next(error);
  }
}

export async function createRental(req, res, next) {
  try {
    await rentalsService.createRental(req.body);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

export async function returnRental(req, res, next) {
  const { id } = req.params;

  try {
    await rentalsService.returnRental(Number(id));
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

export async function deleteRental(req, res, next) {
  const { id } = req.params;

  try {
    await rentalsService.deleteRental(Number(id));
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}
