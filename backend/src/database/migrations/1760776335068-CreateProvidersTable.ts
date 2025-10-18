import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProvidersTable1760776335068 implements MigrationInterface {
    name = 'CreateProvidersTable1760776335068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course_providers" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "profile_picture" text, "phone" character varying(20), "email" character varying(255), "description" text, "user_id" uuid, CONSTRAINT "UQ_a0c0f8dbace97ae557795f85d24" UNIQUE ("name"), CONSTRAINT "REL_93c954703c0ee96a40f5f06be0" UNIQUE ("user_id"), CONSTRAINT "PK_21c37534695f0fead574b69c617" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "course_providers" ADD CONSTRAINT "FK_93c954703c0ee96a40f5f06be04" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_providers" DROP CONSTRAINT "FK_93c954703c0ee96a40f5f06be04"`);
        await queryRunner.query(`DROP TABLE "course_providers"`);
    }

}
