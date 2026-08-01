import { Router } from "express";
import { deleteEpisode, getEpisode, updateEpisode } from "../controllers/movie.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";

const router = Router();

router.get("/:id", getEpisode);
router.put("/:id", protect, requireAdmin, updateEpisode);
router.delete("/:id", protect, requireAdmin, deleteEpisode);

export default router;
