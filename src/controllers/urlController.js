import { db } from "../database/db.js";
import { nanoid } from "nanoid";

export async function shortenUrl(req, res) {
  const userId = res.locals.userId;
  const { url } = req.body;
  const shortUrl = nanoid(8);

  try {
    await db.query(
      `INSERT INTO shortens ("originalUrl", "shortenedUrl", "userId") VALUES ($1, $2, $3)`,
      [url, shortUrl, userId]
    );

    res.send({ shortUrl }).status(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
