import express from "express";
import { getPreview, updatePreview } from "../controllers/company-preview.controller";
import { auth } from "../middleware/auth";

const router = express.Router();

// Recruiter
router.get("/:companySlug/preview", auth, getPreview);
router.patch("/:companySlug/edit", auth, updatePreview);

export default router;
