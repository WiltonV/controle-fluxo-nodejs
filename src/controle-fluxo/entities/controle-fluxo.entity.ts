import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ControleFluxoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idFilial: number;

  @Column()
  currentCount: number;

  @Column()
  maxCount: number;

  @Column()
  date: Date;
}
