import { Router } from "express";
import { getUser, rankingUsers } from "../controllers/userController.js";
import { authValidation } from "../middlewares/authValidation.js";

const router = Router();

router.get("/users/me", authValidation, getUser);
router.get("/ranking", rankingUsers);

export default router;
