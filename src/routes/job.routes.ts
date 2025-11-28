import express from "express";
import { createJob, deleteJob, editJob, getOneJob, getJobs } from "../controllers/job.controller";

const router = express.Router();

// GET /:companySlug/jobs
router.get("/job/:jobSlug", getOneJob);

// GET /:companySlug/jobs
router.get("/jobs", getJobs);

// POST /:companySlug/jobs
router.post("/job", createJob);

// PATCH /:companySlug/job/edit
router.patch("/job/:jobSlug/edit", editJob);

// DELETE /:companySlug/job/delete
router.delete("/job/:jobSlug/delete", deleteJob);

export default router;
