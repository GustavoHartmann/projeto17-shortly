import { db } from "../database/db.js";

export async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const authToken = authorization?.replace("Bearer ", "");

  if (!authToken) {
    return res.sendStatus(401);
  }

  try {
    const sessionExists = await db.query(
      `SELECT * FROM sessions WHERE token = $1`,
      [authToken]
    );

    if (sessionExists.rowCount === 0) {
      return res.sendStatus(401);
    }

    const userId = sessionExists.rows[0].userId
    res.locals.userId = userId

  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }

  

  next();
}
