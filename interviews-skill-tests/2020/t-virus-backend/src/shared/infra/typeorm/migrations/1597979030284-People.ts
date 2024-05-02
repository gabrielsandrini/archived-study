import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class People1597979030284 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: 'people',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'age',
            type: 'smallint',
          },
          {
            name: 'gender',
            type: 'varchar',
          },
          {
            name: 'lonlat',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'infected',
            type: 'boolean',
            default: false,
          },
          {
            name: 'Fiji Water',
            type: 'smallint',
          },
          {
            name: 'Campbell Soup',
            type: 'smallint',
          },
          {
            name: 'First Aid Pouch',
            type: 'smallint',
          },
          {
            name: 'AK47',
            type: 'smallint',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('people');
  }
}
