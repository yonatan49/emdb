import { Router } from "express";
import { createAward, listAwards } from "../controllers/award.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";

const router = Router();

router.get("/", listAwards);
router.post("/", protect, requireAdmin, createAward);

export default router;
