import { Router } from "express";
import { getUser } from "../controllers/userController.js";
import { authValidation } from "../middlewares/authValidation.js";

const router = Router();

router.get("/users/me", authValidation, getUser);

export default router;
