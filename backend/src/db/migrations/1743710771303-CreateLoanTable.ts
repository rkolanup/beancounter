import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLoanTable1743710771303 implements MigrationInterface {
    name = 'CreateLoanTable1743710771303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "loan" ("id" SERIAL NOT NULL, "lender" character varying NOT NULL, "originalAmount" numeric(12,2) NOT NULL, "balance" numeric(12,2) NOT NULL, "interestRate" numeric(5,2) NOT NULL, "startDate" TIMESTAMP NOT NULL, "monthlyPayment" numeric(12,2) NOT NULL, "notes" character varying, CONSTRAINT "PK_4ceda725a323d254a5fd48bf95f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "loan"`);
    }

}
