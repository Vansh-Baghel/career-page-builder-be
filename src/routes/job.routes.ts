import express from "express";
import { createJob, deleteJob, editJob, getOneJob, getJobs } from "../controllers/job.controller";

const router = express.Router();

router.get("/:companySlug/jobs", getJobs);

router.get("/:companySlug/job/:jobSlug", getOneJob);

router.post("/:companySlug/job", createJob);

router.patch("/:companySlug/job/:jobSlug/edit", editJob);

router.delete("/:companySlug/job/:jobSlug/delete", deleteJob);

export default router;
