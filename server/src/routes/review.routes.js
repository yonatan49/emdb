import { Router } from "express";
import { deleteReview, likeReview, updateReview } from "../controllers/review.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);
router.post("/:id/like", protect, likeReview);

export default router;
