import { Router } from "express";
import { signUp } from "../controllers/signUpController.js";
import { signUpValidation } from "../middlewares/signUpValidation.js";

const router = Router();

router.post("/signup", signUpValidation, signUp);

export default router;
