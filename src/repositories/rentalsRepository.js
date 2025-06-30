import connection from "../database/database.js";

export async function findGameById(id) {
  const result = await connection.query(
    `SELECT * FROM games WHERE id = $1;`,
    [id]
  );
  return result.rows[0];
}

export async function findAllRentals() {
  
  const result = await connection.query(`
    SELECT rentals.*, 
           customers.name AS "customerName", 
           games.name AS "gameName", 
           games."pricePerDay"
    FROM rentals
    JOIN customers ON rentals."customerId" = customers.id
    JOIN games ON rentals."gameId" = games.id;
  `);
  return result.rows;
}

export async function insertRental(rental) {
  const {
    customerId,
    gameId,
    rentDate,
    daysRented,
    originalPrice
  } = rental;

  await connection.query(`
    INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
    VALUES ($1, $2, $3, $4, null, $5, null);
  `, [customerId, gameId, rentDate, daysRented, originalPrice]);
}

export async function findRentalById(id) {
  const result = await connection.query(`
    SELECT * FROM rentals WHERE id = $1;
  `, [id]);
  return result.rows[0];
}

export async function updateRentalReturn(id, returnDate, delayFee) {
  await connection.query(`
    UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3;
  `, [returnDate, delayFee, id]);
}

export async function deleteRental(id) {
  await connection.query(`
    DELETE FROM rentals WHERE id = $1;
  `, [id]);
}

export async function countActiveRentalsByGameId(gameId) {
  const result = await connection.query(`
    SELECT COUNT(*) FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL;
  `, [gameId]);
  return parseInt(result.rows[0].count, 10);
}
