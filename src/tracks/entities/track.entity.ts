import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Artist } from "../../artists/entities/artist.entity";
import { Album } from "../../albums/entities/album.entity";

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @ManyToOne(type => Artist, { onDelete: "SET NULL", onUpdate: "CASCADE", createForeignKeyConstraints: true, nullable: true })
  @JoinColumn()
  artist?: Artist; // refers to Artist

  @Column({ nullable: true })
  artistId: string;

  @ManyToOne(type => Album, { onDelete: "SET NULL", onUpdate: "CASCADE", createForeignKeyConstraints: true, nullable: true })
  @JoinColumn()
  album?: Album; // refers to Album

  @Column({ nullable: true })
  albumId: string;

  @Column()
  duration: number; // integer number

  constructor(dto?: Partial<Omit<Track, 'id'>>) {
    if (dto) {
      Object.assign(this, dto);
    }
  }

  update(dto: Partial<Omit<Track, 'id'>>) {
    Object.assign(this, dto);
  }
}
