import { db } from "../database/db.js";

export async function getUser(req, res) {
  const userId = res.locals.userId;

  try {
    const user = await db.query(`SELECT * FROM users WHERE id = $1`, [userId]);

    const visitCount = await db.query(
      `SELECT SUM(views) FROM shortens WHERE "userId" = $1`,
      [userId]
    );

    const shortenedUrl = await db.query(
      `SELECT * FROM shortens WHERE "userId" = $1`,
      [userId]
    );

    const shortUrls = [];

    shortenedUrl.rows.forEach((c) =>
      shortUrls.push({
        id: c.id,
        shortUrl: c.shortenedUrl,
        url: c.originalUrl,
        visitCount: c.views,
      })
    );

    res.status(200).send({
      id: userId,
      name: user.rows[0].name,
      visitCount: visitCount.rows[0].sum,
      shortenedUrls: shortUrls,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function rankingUsers(req, res) {
  try {
    const result = await db.query(
      `SELECT u.id, u.name, COUNT(s.id) AS "linksCount", COALESCE(SUM(s.views), 0) AS "visitCount"
       FROM users u
       LEFT JOIN shortens s ON s."userId" = u.id
       GROUP BY u.id
       ORDER BY "visitCount" DESC
       LIMIT 10`
    );

    res.status(200).send(result.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
