import { MigrationInterface, QueryRunner } from "typeorm";

export class refreshToken1677757034246 implements MigrationInterface {
    name = 'refreshToken1677757034246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "refreshToken" character varying(300)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
    }

}
