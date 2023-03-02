import { db } from "../database/db.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const { name, email, password } = res.locals.user;
  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, passwordHash])

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}