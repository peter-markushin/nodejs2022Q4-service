import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  name: string;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  year: number;

  @IsOptional()
  @IsUUID()
  artistId: string | null; // refers to Artist
}
