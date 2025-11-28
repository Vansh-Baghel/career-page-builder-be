import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1764342908899 implements MigrationInterface {
    name = 'InitSchema1764342908899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_6ce4483dc65ed9d2e171269d801"`);
        await queryRunner.query(`ALTER TABLE "jobs" RENAME COLUMN "companyId" TO "company_id"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_087a773c50525e348e26188e7cc" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_087a773c50525e348e26188e7cc"`);
        await queryRunner.query(`ALTER TABLE "jobs" RENAME COLUMN "company_id" TO "companyId"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_6ce4483dc65ed9d2e171269d801" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
