import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1764342710427 implements MigrationInterface {
    name = 'InitSchema1764342710427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "salary_range"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "salary" character varying NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."jobs_employment_type_enum" RENAME TO "jobs_employment_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."jobs_employment_type_enum" AS ENUM('full-time', 'part-time', 'contract')`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "employment_type" TYPE "public"."jobs_employment_type_enum" USING "employment_type"::"text"::"public"."jobs_employment_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."jobs_employment_type_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."jobs_job_type_enum" RENAME TO "jobs_job_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."jobs_job_type_enum" AS ENUM('permanent', 'temporary', 'internship')`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "job_type" TYPE "public"."jobs_job_type_enum" USING "job_type"::"text"::"public"."jobs_job_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."jobs_job_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "posted_days_ago"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "posted_days_ago" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "posted_days_ago"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "posted_days_ago" integer NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."jobs_job_type_enum_old" AS ENUM('permanent', 'contract')`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "job_type" TYPE "public"."jobs_job_type_enum_old" USING "job_type"::"text"::"public"."jobs_job_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."jobs_job_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."jobs_job_type_enum_old" RENAME TO "jobs_job_type_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."jobs_employment_type_enum_old" AS ENUM('full-time', 'part-time', 'internship')`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "employment_type" TYPE "public"."jobs_employment_type_enum_old" USING "employment_type"::"text"::"public"."jobs_employment_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."jobs_employment_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."jobs_employment_type_enum_old" RENAME TO "jobs_employment_type_enum"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "salary"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "salary_range" character varying NOT NULL`);
    }

}
