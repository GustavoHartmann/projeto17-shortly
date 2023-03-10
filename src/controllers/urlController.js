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

    const shorten = await db.query(
      `SELECT (id) FROM shortens WHERE "shortenedUrl" = $1`,
      [shortUrl]
    );

    res.status(201).send({ id: shorten.rows[0].id, shortUrl });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getShortenedUrl(req, res) {
  const { id } = req.params;

  try {
    const shortenedUrl = await db.query(
      `SELECT * FROM shortens WHERE id = $1`,
      [id]
    );

    if (shortenedUrl.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.status(200).send({
      id: shortenedUrl.rows[0].id,
      shortUrl: shortenedUrl.rows[0].shortenedUrl,
      url: shortenedUrl.rows[0].originalUrl,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function openShortUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const shortenedUrl = await db.query(
      `SELECT * FROM shortens WHERE "shortenedUrl" = $1`,
      [shortUrl]
    );

    if (shortenedUrl.rowCount === 0) {
      return res.sendStatus(404);
    }

    await db.query(`UPDATE shortens SET views = views + 1 WHERE id = $1`, [
      shortenedUrl.rows[0].id,
    ]);

    res.redirect(shortenedUrl.rows[0].originalUrl);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const userId = res.locals.userId;

  try {
    const shortenedUrl = await db.query(
      `SELECT * FROM shortens WHERE id = $1`,
      [id]
    );

    if (shortenedUrl.rowCount === 0) {
      return res.sendStatus(404);
    }

    if (shortenedUrl.rows[0].userId !== userId) {
      return res.sendStatus(401);
    }

    await db.query(`DELETE FROM shortens WHERE id = $1`, [id]);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
