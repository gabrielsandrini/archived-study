import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('people')
class People {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column({ nullable: true })
  lonlat?: string;

  @Column({ default: false })
  infected: boolean;

  @Column({ name: 'Fiji Water' })
  fiji_water: number;

  @Column({ name: 'Campbell Soup' })
  campbell_soup: number;

  @Column({ name: 'First Aid Pouch' })
  first_aid_pouch: number;

  @Column({ name: 'AK47' })
  AK47: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default People;
