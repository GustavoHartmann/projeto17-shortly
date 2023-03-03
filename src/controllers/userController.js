import { db } from "../database/db.js";

export async function getUser(req, res) {
  const userId = res.locals.userId;

  try {
    const user = await db.query(`SELECT * FROM users WHERE id = $1`, [userId]);

    const visitCount = await db.query(
      `SELECT SUM(views) FROM shortens WHERE "userId" = $1`,
      [userId]
    );

    const shortenedUrl = await db.query(`SELECT * FROM shortens WHERE "userId" = $1`, [userId])

    res.status(200).send({
      id: userId,
      name: user.rows[0].name,
      visitCount: visitCount.rows[0].sum,
      shortenedUrls: shortenedUrl.rows,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
