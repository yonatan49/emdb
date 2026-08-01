import { Router } from "express";
import authRoutes from "./auth.routes.js";
import movieRoutes from "./movie.routes.js";
import personRoutes from "./person.routes.js";
import genreRoutes from "./genre.routes.js";
import companyRoutes from "./company.routes.js";
import reviewRoutes from "./review.routes.js";
import watchlistRoutes from "./watchlist.routes.js";
import awardRoutes from "./award.routes.js";
import userRoutes from "./user.routes.js";
import adminRoutes from "./admin.routes.js";
import episodeRoutes from "./episode.routes.js";
import movieAwardRoutes from "./movieAward.routes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok", service: "emdb-api" });
});

router.use("/auth", authRoutes);
router.use("/movies", movieRoutes);
router.use("/people", personRoutes);
router.use("/genres", genreRoutes);
router.use("/companies", companyRoutes);
router.use("/reviews", reviewRoutes);
router.use("/watchlist", watchlistRoutes);
router.use("/awards", awardRoutes);
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/episodes", episodeRoutes);
router.use("/movie-awards", movieAwardRoutes);

export default router;
