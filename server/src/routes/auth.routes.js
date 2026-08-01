import { Router } from "express";
import { forgotPassword, login, logout, me, refresh, register, resetPassword } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { authValidators } from "../validators/index.js";

const router = Router();

router.post("/register", validateBody(authValidators.register), register);
router.post("/login", validateBody(authValidators.login), login);
router.post("/logout", logout);
router.get("/me", protect, me);
router.post("/refresh", refresh);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
