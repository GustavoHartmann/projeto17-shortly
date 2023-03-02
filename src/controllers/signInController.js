import { db } from "../database/db.js";
import { v4 as uuid } from "uuid";

export async function signIn(req, res) {
  const { email } = res.locals.user;
  const token = uuid();

  try {
    const userId = await db.query(`SELECT (id) FROM users WHERE email = $1`, [
      email,
    ]);

    await db.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, [
      token,
      userId.rows[0].id,
    ]);

    res.send(token).status(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
