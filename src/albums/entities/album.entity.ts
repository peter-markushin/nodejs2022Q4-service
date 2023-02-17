import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Artist } from "../../artists/entities/artist.entity";

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(type => Artist, { onDelete: "SET NULL", onUpdate: "CASCADE", createForeignKeyConstraints: true, nullable: true })
  @JoinColumn()
  artist?: Artist; // refers to Artist

  @Column({ nullable: true })
  artistId: string;

  constructor(dto?: Partial<Omit<Album, 'id'>>) {
    if (dto) {
      Object.assign(this, dto);
    }
  }

  public update(dto: Partial<Omit<Album, 'id'>>) {
    Object.assign(this, dto);
  }
}
