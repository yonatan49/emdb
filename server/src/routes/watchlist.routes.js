import { Router } from "express";
import { addToWatchlist, listWatchlist, removeWatchlistItem, updateWatchlistItem } from "../controllers/watchlist.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protect, listWatchlist);
router.post("/", protect, addToWatchlist);
router.put("/:movieId", protect, updateWatchlistItem);
router.delete("/:movieId", protect, removeWatchlistItem);

export default router;
