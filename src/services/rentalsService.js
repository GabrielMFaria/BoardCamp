import dayjs from "dayjs";
import * as rentalsRepository from "../repositories/rentalsRepository.js";
import * as customersRepository from "../repositories/customersRepository.js";
import * as gamesRepository from "../repositories/gamesRepository.js";

export async function getAllRentals() {
  const rows = await rentalsRepository.findAllRentals();
  const rentals = rows.map(row => ({
    id: row.id,
    customerId: row.customerId,
    gameId: row.gameId,
    rentDate: row.rentDate,
    daysRented: row.daysRented,
    returnDate: row.returnDate,
    originalPrice: row.originalPrice,
    delayFee: row.delayFee,
    customer: {
      id: row.customerId,
      name: row.customerName,
    },
    game: {
      id: row.gameId,
      name: row.gameName,
    }
  }));

  return rentals;
}

export async function createRental({ customerId, gameId, daysRented }) {
  if (!daysRented || daysRented <= 0) {
    const error = new Error("daysRented deve ser maior que zero");
    error.type = "bad_request";
    throw error;
  }

  const customer = await customersRepository.findCustomerById(customerId);
  if (!customer) {
    const error = new Error("Cliente não encontrado");
    error.type = "not_found";
    throw error;
  }

  const game = await gamesRepository.findGameById(gameId);
  if (!game) {
    const error = new Error("Jogo não encontrado");
    error.type = "not_found";
    throw error;
  }

  const activeRentalsCount = await rentalsRepository.countActiveRentalsByGameId(gameId);
  if (activeRentalsCount >= game.stockTotal) {
    const error = new Error("Não há jogos disponíveis para aluguel");
    error.type = "unprocessable_entity";
    throw error;
  }

  const originalPrice = daysRented * game.pricePerDay;
  const rentDate = dayjs().format("YYYY-MM-DD");

  await rentalsRepository.insertRental({
    customerId,
    gameId,
    rentDate,
    daysRented,
    originalPrice,
    returnDate: null,
    delayFee: null
  });
}

export async function returnRental(id) {
  const rental = await rentalsRepository.findRentalById(id);

  if (!rental) {
    const error = new Error("Aluguel não encontrado");
    error.type = "not_found";
    throw error;
  }

  if (rental.returnDate) {
    const error = new Error("Aluguel já finalizado");
    error.type = "unprocessable_entity";
    throw error;
  }

  const returnDate = dayjs(); 
  const rentDate = dayjs(rental.rentDate);
  const daysPassed = returnDate.diff(rentDate, "day");

  const game = await gamesRepository.findGameById(rental.gameId);

  const delayDays = Math.max(0, daysPassed - rental.daysRented);
  const delayFee = delayDays * game.pricePerDay;

  await rentalsRepository.updateRentalReturn(id, returnDate.format("YYYY-MM-DD"), delayFee);
}

export async function deleteRental(id) {
  const rental = await rentalsRepository.findRentalById(id);

  if (!rental) {
    const error = new Error("Aluguel não encontrado");
    error.type = "not_found";
    throw error;
  }

  if (!rental.returnDate) {
    const error = new Error("Aluguel ainda não finalizado");
    error.type = "bad_request"; 
    throw error;
  }

  await rentalsRepository.deleteRental(id);
}
