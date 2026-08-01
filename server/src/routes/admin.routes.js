import { Router } from "express";
import { approveReview, getStats, listPendingReviews, updateUserRole } from "../controllers/admin.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";

const router = Router();

router.use(protect, requireAdmin);
router.get("/stats", getStats);
router.get("/reviews/pending", listPendingReviews);
router.put("/reviews/:id/approve", approveReview);
router.put("/users/:id/role", updateUserRole);

export default router;
