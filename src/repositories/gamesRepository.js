import connection from "../database/database.js";

export async function findAllGames() {
  const result = await connection.query("SELECT * FROM games;");
  return result.rows;
}

export async function findGameByName(name) {
  const result = await connection.query(
    "SELECT * FROM games WHERE name = $1;",
    [name]
  );
  return result.rows[0];
}

export async function insertGame(game) {
  const { name, image, stockTotal, pricePerDay } = game;
  await connection.query(
    `INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4);`,
    [name, image, stockTotal, pricePerDay]
  );
}

export async function findGameById(id) {
  const result = await connection.query(`SELECT * FROM games WHERE id = $1;`, [id]);
  return result.rows[0];
}

