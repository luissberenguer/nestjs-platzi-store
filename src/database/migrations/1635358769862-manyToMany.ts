import {MigrationInterface, QueryRunner} from "typeorm";

export class manyToMany1635358769862 implements MigrationInterface {
    name = 'manyToMany1635358769862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_category_category" ("productId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_f4340e51cf15d253111ae3bc5da" PRIMARY KEY ("productId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7345bf754167ef603701fca9e6" ON "product_category_category" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9f6058f88651acb9c6fd62e589" ON "product_category_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "category" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "name" character varying(155) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "product_category_category" ADD CONSTRAINT "FK_7345bf754167ef603701fca9e6e" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_category_category" ADD CONSTRAINT "FK_9f6058f88651acb9c6fd62e5890" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_category_category" DROP CONSTRAINT "FK_9f6058f88651acb9c6fd62e5890"`);
        await queryRunner.query(`ALTER TABLE "product_category_category" DROP CONSTRAINT "FK_7345bf754167ef603701fca9e6e"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "UQ_23c05c292c439d77b0de816b500"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "createAt"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9f6058f88651acb9c6fd62e589"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7345bf754167ef603701fca9e6"`);
        await queryRunner.query(`DROP TABLE "product_category_category"`);
    }

}
