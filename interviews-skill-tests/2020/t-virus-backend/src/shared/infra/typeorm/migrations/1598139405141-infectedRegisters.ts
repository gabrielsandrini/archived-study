import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class infectedRegisters1598139405141
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'infectedRegisters',
        columns: [
          {
            name: 'people_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'infected_id',
            type: 'uuid',
            isPrimary: true,
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
    await queryRunner.dropTable('infectedRegisters');
  }
}
