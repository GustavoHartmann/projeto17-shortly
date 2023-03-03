import { Router } from "express";
import { getShortenedUrl, openShortUrl, shortenUrl } from "../controllers/urlController.js";
import { authorizationValidation } from "../middlewares/authorizationValidation.js";

const router = Router();

router.post("/urls/shorten", authorizationValidation, shortenUrl);
router.get("/urls/:id", getShortenedUrl);
router.get("/urls/open/:shortUrl", openShortUrl);

export default router;
