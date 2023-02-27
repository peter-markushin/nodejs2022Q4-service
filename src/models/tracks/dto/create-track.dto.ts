import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID()
  artistId: string | null; // refers to Artist

  @IsOptional()
  @IsUUID()
  albumId: string | null; // refers to Album

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  duration: number; // integer number
}
