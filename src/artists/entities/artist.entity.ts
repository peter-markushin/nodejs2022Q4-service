import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ length: 50 })
  name: string;

  @Column()
  grammy: boolean;

  constructor(dto?: Pick<Artist, 'name' | 'grammy'>) {
    if (dto) {
      Object.assign(this, dto);
    }
  }

  update(dto: Partial<Pick<Artist, 'name' | 'grammy'>>): void {
    Object.assign(this, dto);
  }
}
