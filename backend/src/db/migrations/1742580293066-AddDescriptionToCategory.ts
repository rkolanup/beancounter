import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionToCategory1742580293066 implements MigrationInterface {
    name = 'AddDescriptionToCategory1742580293066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "description"`);
    }

}
