import { Router } from "express";
import { createPerson, deletePerson, getFilmography, getPerson, getPersonAwards, searchPeople, updatePerson } from "../controllers/person.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { personValidators } from "../validators/index.js";

const router = Router();

router.get("/search", searchPeople);
router.get("/:id", getPerson);
router.get("/:id/filmography", getFilmography);
router.get("/:id/awards", getPersonAwards);
router.post("/", protect, requireAdmin, validateBody(personValidators.create), createPerson);
router.put("/:id", protect, requireAdmin, updatePerson);
router.delete("/:id", protect, requireAdmin, deletePerson);

export default router;
