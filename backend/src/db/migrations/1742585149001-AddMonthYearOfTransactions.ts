import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMonthYearOfTransactions1742585149001 implements MigrationInterface {
    name = 'AddMonthYearOfTransactions1742585149001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "month" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "year" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "month"`);
    }

}
