import { MigrationInterface, QueryRunner } from "typeorm";

export class FixBudget1744309183928 implements MigrationInterface {
    name = 'FixBudget1744309183928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "budget" RENAME COLUMN "category" TO "category_id"`);
        await queryRunner.query(`ALTER TABLE "budget" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "budget" ADD "category_id" integer`);
        await queryRunner.query(`ALTER TABLE "budget" ADD CONSTRAINT "FK_af6f95ccfa1f460edca6b488803" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "budget" DROP CONSTRAINT "FK_af6f95ccfa1f460edca6b488803"`);
        await queryRunner.query(`ALTER TABLE "budget" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "budget" ADD "category_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "budget" RENAME COLUMN "category_id" TO "category"`);
    }

}
