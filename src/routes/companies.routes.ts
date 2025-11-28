import { publicCareers } from "../controllers/public-careers.controller";
import express from "express";

const router = express.Router();

router.get("/companies", publicCareers);

export default router;
