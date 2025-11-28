import { Router } from "express";
import authRouter from "./auth.routes";
import companiesRouter from "./companies.routes";
import companyRouter from "./company.routes";
import fileUploadRouter from "./fileUpload.routes";
import jobRouter from "./job.routes";
import publishRouter from "./publish.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/company", companyRouter);
router.use("/publish", publishRouter);
router.use("/file-upload", fileUploadRouter);
router.use("/", jobRouter, companiesRouter);

export default router;