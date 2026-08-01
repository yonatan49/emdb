import { Router } from "express";
import { createCompany, deleteCompany, getCompany, listCompanies, updateCompany } from "../controllers/company.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";

const router = Router();

router.get("/", listCompanies);
router.get("/:id", getCompany);
router.post("/", protect, requireAdmin, createCompany);
router.put("/:id", protect, requireAdmin, updateCompany);
router.delete("/:id", protect, requireAdmin, deleteCompany);

export default router;
