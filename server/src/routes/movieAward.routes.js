import { Router } from "express";
import { deleteMovieAward } from "../controllers/award.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";

const router = Router();

router.delete("/:id", protect, requireAdmin, deleteMovieAward);

export default router;
