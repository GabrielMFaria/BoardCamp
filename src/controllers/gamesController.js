import * as gamesService from "../services/gamesService.js";

export async function getGames(req, res, next) {
  try {
    const games = await gamesService.getAllGames();
    res.status(200).send(games);
  } catch (error) {
    next(error);
  }
}

export async function postGame(req, res, next) {
  try {
    await gamesService.createGame(req.body);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}
