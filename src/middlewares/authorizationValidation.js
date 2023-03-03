import { db } from "../database/db.js";
import { urlSchema } from "../models/urlSchema.js";

export async function authorizationValidation(req, res, next) {
  const { authorization } = req.headers;
  const authToken = authorization?.replace("Bearer ", "");

  const { error } = urlSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((d) => d.message);
    return res.status(422).send(errors);
  }

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
