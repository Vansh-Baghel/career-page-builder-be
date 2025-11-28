import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1764344514705 implements MigrationInterface {
    name = 'InitSchema1764344514705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "work_policy"`);
        await queryRunner.query(`DROP TYPE "public"."jobs_work_policy_enum"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "work_policy" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "employment_type"`);
        await queryRunner.query(`DROP TYPE "public"."jobs_employment_type_enum"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "employment_type" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "experience_level"`);
        await queryRunner.query(`DROP TYPE "public"."jobs_experience_level_enum"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "experience_level" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "job_type"`);
        await queryRunner.query(`DROP TYPE "public"."jobs_job_type_enum"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "job_type" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "job_type"`);
        await queryRunner.query(`CREATE TYPE "public"."jobs_job_type_enum" AS ENUM('permanent', 'temporary', 'internship')`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "job_type" "public"."jobs_job_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "experience_level"`);
        await queryRunner.query(`CREATE TYPE "public"."jobs_experience_level_enum" AS ENUM('junior', 'mid', 'senior')`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "experience_level" "public"."jobs_experience_level_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "employment_type"`);
        await queryRunner.query(`CREATE TYPE "public"."jobs_employment_type_enum" AS ENUM('full-time', 'part-time', 'contract')`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "employment_type" "public"."jobs_employment_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "work_policy"`);
        await queryRunner.query(`CREATE TYPE "public"."jobs_work_policy_enum" AS ENUM('remote', 'hybrid', 'onsite')`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "work_policy" "public"."jobs_work_policy_enum" NOT NULL`);
    }

}
