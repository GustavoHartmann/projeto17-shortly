import { db } from "../database/db.js";
import bcrypt from "bcrypt";
import { signInSchema } from "../models/signInSchema.js";

export async function signInValidation(req, res, next) {
  const user = req.body;

  const { error } = signInSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((d) => d.message);
    return res.status(422).send(errors);
  }

  try {
    const userExists = await db.query(`SELECT * FROM users WHERE email = $1`, [
      user.email,
    ]);

    if (userExists.rowCount === 0) {
      return res.sendStatus(401);
    }

    const correctPassword = bcrypt.compareSync(
      user.password,
      userExists.rows[0].password
    );

    if (!correctPassword) {
      return res.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
  res.locals.user = user;

  next();
}
