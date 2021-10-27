import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserCustomer1635321779112 implements MigrationInterface {
  name = 'createUserCustomer1635321779112';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" character varying(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "customerId" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_6c687a8fa35b0ae35ce766b56ce" UNIQUE ("customerId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "username" character varying(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "email" character varying(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "name" character varying(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "lastName"`);
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "lastName" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" DROP CONSTRAINT "UQ_03846b4bae9df80f19c76005a82"`,
    );
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "phone" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce"`,
    );
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "phone" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD CONSTRAINT "UQ_03846b4bae9df80f19c76005a82" UNIQUE ("phone")`,
    );
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "lastName"`);
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "lastName" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "email" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "username" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "updateAt"`);
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "createAt"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_6c687a8fa35b0ae35ce766b56ce"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "customerId"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updateAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
  }
}
