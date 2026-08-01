import { Router } from "express";
import { deleteMe, getPublicProfile, listMyRatings, updateMe } from "../controllers/user.controller.js";
import { listUserReviews } from "../controllers/review.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/me/ratings", protect, listMyRatings);
router.put("/me", protect, updateMe);
router.delete("/me", protect, deleteMe);
router.get("/:id/reviews", listUserReviews);
router.get("/:id", getPublicProfile);

export default router;
