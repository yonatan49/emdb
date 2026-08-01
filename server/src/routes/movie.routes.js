import { Router } from "express";
import {
  createEpisode,
  createMovie,
  deleteMovie,
  getMovie,
  listEpisodes,
  listMovies,
  newReleases,
  searchMovies,
  similarMovies,
  trendingMovies,
  updateMovie,
} from "../controllers/movie.controller.js";
import { attachMovieAward, listMovieAwards } from "../controllers/award.controller.js";
import { createReview, listMovieReviews } from "../controllers/review.controller.js";
import { deleteMyRating, getMyRating, upsertRating } from "../controllers/rating.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { movieValidators, ratingValidators, reviewValidators } from "../validators/index.js";

const router = Router();

router.get("/", listMovies);
router.get("/search", searchMovies);
router.get("/trending", trendingMovies);
router.get("/new-releases", newReleases);
router.get("/:id", getMovie);
router.get("/:id/similar", similarMovies);
router.post("/", protect, requireAdmin, validateBody(movieValidators.create), createMovie);
router.put("/:id", protect, requireAdmin, updateMovie);
router.delete("/:id", protect, requireAdmin, deleteMovie);

router.get("/:movieId/episodes", listEpisodes);
router.post("/:movieId/episodes", protect, requireAdmin, createEpisode);
router.post("/:id/ratings", protect, validateBody(ratingValidators.create), upsertRating);
router.get("/:id/ratings/me", protect, getMyRating);
router.delete("/:id/ratings", protect, deleteMyRating);

router.get("/:id/reviews", listMovieReviews);
router.post("/:id/reviews", protect, validateBody(reviewValidators.create), createReview);

router.get("/:id/awards", listMovieAwards);
router.post("/:id/awards", protect, requireAdmin, attachMovieAward);

export default router;
