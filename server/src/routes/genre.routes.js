import { Router } from "express";
import { createGenre, deleteGenre, listGenres, updateGenre } from "../controllers/genre.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";

const router = Router();

router.get("/", listGenres);
router.post("/", protect, requireAdmin, createGenre);
router.put("/:id", protect, requireAdmin, updateGenre);
router.delete("/:id", protect, requireAdmin, deleteGenre);

export default router;
