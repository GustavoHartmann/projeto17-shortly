import { Router } from "express";
import { getShortenedUrl, openShortUrl, shortenUrl, deleteUrl } from "../controllers/urlController.js";
import { authorizationValidation } from "../middlewares/authorizationValidation.js";
import { authValidation } from "../middlewares/authValidation.js";

const router = Router();

router.post("/urls/shorten", authorizationValidation, shortenUrl);
router.get("/urls/:id", getShortenedUrl);
router.get("/urls/open/:shortUrl", openShortUrl);
router.delete("/urls/:id", authValidation, deleteUrl);

export default router;
