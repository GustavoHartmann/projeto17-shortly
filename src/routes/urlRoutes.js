import { Router } from "express";
import { shortenUrl } from "../controllers/urlController.js";
import { authorizationValidation } from "../middlewares/authorizationValidation.js";

const router = Router();

router.post("/urls/shorten", authorizationValidation, shortenUrl);

export default router;
