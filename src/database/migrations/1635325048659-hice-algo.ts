import {MigrationInterface, QueryRunner} from "typeorm";

export class hiceAlgo1635325048659 implements MigrationInterface {
    name = 'hiceAlgo1635325048659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying(255) NOT NULL`);
    }

}
