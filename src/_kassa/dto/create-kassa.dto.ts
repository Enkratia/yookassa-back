import { IsString, MinLength } from 'class-validator';

export class CreateKassaDto {
  @IsString()
  @MinLength(1)
  firstname: string;

  @IsString()
  @MinLength(1)
  lastname: string;

  @IsString()
  @MinLength(1)
  price: string;
}
