import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Company } from "../entities/company";

export const publishCompany = async (req: Request, res: Response) => {
  const { companySlug } = req.params;
  const repo = AppDataSource.getRepository(Company);

  const company = await repo.findOne({
    where: { slug: companySlug },
    relations: ["preview"],
  });

  if (!company) {
    return res.status(404).json({ message: "Company Not Found" });
  }

  if (!company.preview) {
    return res.status(400).json({ message: "No preview available to publish" });
  }

  // Copy preview fields to published fields
  company.published_logo_url = company.preview.logo_url;
  company.published_banner_url = company.preview.banner_url;
  company.published_brand_color = company.preview.brand_color;
  company.published_culture_video_url = company.preview.culture_video_url;
  company.published_sections = company.preview.sections;

  await repo.save(company);

  return res.json({ message: "Published Successfully" });
};
