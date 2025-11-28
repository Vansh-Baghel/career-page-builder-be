import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Company } from "./company";

@Entity("jobs")
export class Job {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Company, (company) => company.jobs, { onDelete: "CASCADE" })
  @JoinColumn({ name: "company_id" })
  company: Company;

  @Column()
  title: string;

  @Column({ type: "text" })
  work_policy: string;

  @Column()
  location: string;

  @Column()
  department: string;

  @Column({
    type: "text",
  })
  employment_type: string;

  @Column({ type: "text" })
  experience_level: string;

  @Column({ type: "text" })
  job_type: string;

  @Column()
  salary: string;

  @Column()
  job_slug: string;

  @Column()
  posted_days_ago: string;

  @Column({ default: true })
  is_published: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
