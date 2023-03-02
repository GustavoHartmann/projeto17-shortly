import { db } from "../database/db.js";
import { signUpSchema } from "../models/signUpSchema.js";

export async function signUpValidation(req, res, next) {
  const user = req.body;

  const { error } = signUpSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((d) => d.message);
    return res.status(422).send(errors);
  }

  try {
    const emailExists = await db.query(`SELECT * FROM users WHERE email = $1`, [
      user.email,
    ]);

    if (emailExists.rowCount > 0) {
      return res.sendStatus(409);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
  res.locals.user = user;

  next();
}
