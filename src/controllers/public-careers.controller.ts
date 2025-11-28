import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Company } from "../entities/company";

export const publicCareers = async (req: Request, res: Response) => {
  const companyRepo = AppDataSource.getRepository(Company);

  const companies = await companyRepo
    .createQueryBuilder("company")
    .leftJoin("company.jobs", "jobs")
    .loadRelationCountAndMap("company.jobs_count", "company.jobs")
    .select([
      "company.id",
      "company.name",
      "company.slug",
      "company.published_logo_url",
      "company.published_banner_url",
      "company.published_brand_color",
    ])
    .orderBy("company.name", "ASC")
    .getMany();

  res.json(companies);
};
