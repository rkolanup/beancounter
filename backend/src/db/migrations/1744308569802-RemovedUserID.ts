import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedUserID1744308569802 implements MigrationInterface {
    name = 'RemovedUserID1744308569802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "saving-goals" DROP CONSTRAINT "FK_5e74e7f3dff0a145952dfb7cc45"`);
        await queryRunner.query(`ALTER TABLE "budget" DROP CONSTRAINT "FK_68df09bd8001a1fb0667a9b42f7"`);
        await queryRunner.query(`ALTER TABLE "saving-goals" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "budget" DROP COLUMN "spent"`);
        await queryRunner.query(`ALTER TABLE "budget" DROP COLUMN "user_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "budget" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "budget" ADD "spent" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "saving-goals" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "budget" ADD CONSTRAINT "FK_68df09bd8001a1fb0667a9b42f7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "saving-goals" ADD CONSTRAINT "FK_5e74e7f3dff0a145952dfb7cc45" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
