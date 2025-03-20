import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1742488866562 implements MigrationInterface {
    name = 'CreateInitialTables1742488866562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "saving-goals" ("id" SERIAL NOT NULL, "goal_name" character varying NOT NULL, "target_amount" numeric NOT NULL, "saved_amount" numeric NOT NULL, "deadline" date NOT NULL, "user_id" integer, CONSTRAINT "PK_4c5203028a5f86e8631734615a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "budget" ("id" SERIAL NOT NULL, "category" character varying NOT NULL, "limit" numeric NOT NULL, "spent" numeric NOT NULL, "user_id" integer, CONSTRAINT "PK_9af87bcfd2de21bd9630dddaa0e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bill" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "amount" numeric NOT NULL, "due_date" TIMESTAMP NOT NULL, "user_id" integer, CONSTRAINT "PK_683b47912b8b30fe71d1fa22199" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "amount" numeric NOT NULL, "expense_type" character varying NOT NULL DEFAULT 'variable', "type" character varying NOT NULL DEFAULT 'expense', "description" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "user_id" integer, "category_id" integer, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "saving-goals" ADD CONSTRAINT "FK_5e74e7f3dff0a145952dfb7cc45" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budget" ADD CONSTRAINT "FK_68df09bd8001a1fb0667a9b42f7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_34e537d6261c55286aa58921ada" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_c9e41213ca42d50132ed7ab2b0f" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_c9e41213ca42d50132ed7ab2b0f"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_34e537d6261c55286aa58921ada"`);
        await queryRunner.query(`ALTER TABLE "budget" DROP CONSTRAINT "FK_68df09bd8001a1fb0667a9b42f7"`);
        await queryRunner.query(`ALTER TABLE "saving-goals" DROP CONSTRAINT "FK_5e74e7f3dff0a145952dfb7cc45"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "bill"`);
        await queryRunner.query(`DROP TABLE "budget"`);
        await queryRunner.query(`DROP TABLE "saving-goals"`);
    }

}
