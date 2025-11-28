import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Company } from "../entities/company";
import { Job } from "../entities/job";
import slugify from "slugify";
import { nanoid } from "nanoid";

export const getOneJob = async (req: Request, res: Response) => {
  const {company_slug, job_slug} = req.params;

  const companyRepo = AppDataSource.getRepository(Company);
  const jobRepo = AppDataSource.getRepository(Job);

  const company = await companyRepo.findOne({
    where: { slug: company_slug },
  });

  if (!company) {
    return res.status(404).json({ message: "Company Not Found" });
  }

  const job = await jobRepo.findOne({
    where: { company: { id: company.id }, job_slug },
  });

  if (!job) {
    return res.status(404).json({ message: "Job Not Found" });
  }

  return res.json(job);
}

export const getJobs = async (req: Request, res: Response) => {
  const { company_slug } = req.params;

  const companyRepo = AppDataSource.getRepository(Company);
  const jobRepo = AppDataSource.getRepository(Job);

  const company = await companyRepo.findOne({
    where: { slug: company_slug },
  });

  if (!company) {
    return res.status(404).json({ message: "Company Not Found" });
  }

  const jobs = await jobRepo.find({
    where: { company: { id: company.id } },
    order: { created_at: "DESC" },
  });

  return res.json(jobs);
};


export const createJob = async (req: Request, res: Response) => {
  const { companySlug } = req.params;

  const {
    title,
    work_policy,
    location,
    department,
    employment_type,
    experience_level,
    job_type,
    salary_range,
  } = req.body;

  try {
    const companyRepo = AppDataSource.getRepository(Company);
    const jobRepo = AppDataSource.getRepository(Job);

    const company = await companyRepo.findOne({
      where: { slug: companySlug },
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Generate job slug
    const job_slug = slugify(title, { lower: true }) + "-" + nanoid(6);

    const job = jobRepo.create({
      company,
      title,
      work_policy,
      location,
      department,
      employment_type,
      experience_level,
      job_type,
      salary_range,
      job_slug,
      posted_days_ago: 0,
      is_published: true,
    });

    await jobRepo.save(job);

    return res.json(job);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating job" });
  }
};
export const editJob = async (req: Request, res: Response) => {
  const { companySlug, jobSlug } = req.params;
  const updates = req.body;

  try {
    const companyRepo = AppDataSource.getRepository(Company);
    const jobRepo = AppDataSource.getRepository(Job);

    const company = await companyRepo.findOne({
      where: { slug: companySlug },
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const job = await jobRepo.findOne({
      where: {
        job_slug: jobSlug,
        company: { id: company.id },
      },
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // 🔒 Allowed fields only:
    const allowedFields = [
      "title",
      "work_policy",
      "location",
      "department",
      "employment_type",
      "experience_level",
      "job_type",
      "salary_range",
    ];

    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        (job as any)[field] = updates[field];
      }
    }

    await jobRepo.save(job);

    return res.json(job);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating job" });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  const { companySlug, jobSlug } = req.params;

  try {
    const companyRepo = AppDataSource.getRepository(Company);
    const jobRepo = AppDataSource.getRepository(Job);

    const company = await companyRepo.findOne({
      where: { slug: companySlug },
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const job = await jobRepo.findOne({
      where: {
        job_slug: jobSlug,
        company: { id: company.id },
      },
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await jobRepo.remove(job);

    return res.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting job" });
  }
};
