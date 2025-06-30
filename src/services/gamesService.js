import * as gamesRepository from "../repositories/gamesRepository.js";

export async function getAllGames() {
  return await gamesRepository.findAllGames();
}

export async function createGame(game) {
  
  const existingGame = await gamesRepository.findGameByName(game.name);
  if (existingGame) {
    const error = new Error("Jogo já cadastrado");
    error.type = "conflict";
    throw error;
  }

  await gamesRepository.insertGame(game);
}
