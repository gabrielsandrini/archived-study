import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('infectedRegisters')
class infectedRegister {
  @Column({
    primary: true,
  })
  people_id: string;

  @Column({
    primary: true,
  })
  infected_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default infectedRegister;
