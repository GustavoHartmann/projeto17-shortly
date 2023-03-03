import { Router } from "express";
import { getShortenedUrl, shortenUrl } from "../controllers/urlController.js";
import { authorizationValidation } from "../middlewares/authorizationValidation.js";

const router = Router();

router.post("/urls/shorten", authorizationValidation, shortenUrl);
router.get("/urls/:id", getShortenedUrl);

export default router;
