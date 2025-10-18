import { MigrationInterface, QueryRunner } from "typeorm";

export class ManyToManyCourseToCustomer1760777560042 implements MigrationInterface {
    name = 'ManyToManyCourseToCustomer1760777560042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_16fcd8ab8bc042688984d5b3934"`);
        await queryRunner.query(`CREATE TABLE "course_customers" ("course_id" uuid NOT NULL, "customer_id" uuid NOT NULL, CONSTRAINT "PK_00e03017c622a73c5e20b43fa0a" PRIMARY KEY ("course_id", "customer_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b7df95f7db23f251eabb167a57" ON "course_customers" ("course_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a49e912042b0ddcdee3bfa8562" ON "course_customers" ("customer_id") `);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_16fcd8ab8bc042688984d5b3934" FOREIGN KEY ("created_by") REFERENCES "course_providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_customers" ADD CONSTRAINT "FK_b7df95f7db23f251eabb167a573" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "course_customers" ADD CONSTRAINT "FK_a49e912042b0ddcdee3bfa8562a" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_customers" DROP CONSTRAINT "FK_a49e912042b0ddcdee3bfa8562a"`);
        await queryRunner.query(`ALTER TABLE "course_customers" DROP CONSTRAINT "FK_b7df95f7db23f251eabb167a573"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_16fcd8ab8bc042688984d5b3934"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a49e912042b0ddcdee3bfa8562"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b7df95f7db23f251eabb167a57"`);
        await queryRunner.query(`DROP TABLE "course_customers"`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_16fcd8ab8bc042688984d5b3934" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
