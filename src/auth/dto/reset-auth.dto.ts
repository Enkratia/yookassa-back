import { IsString } from 'class-validator';

export class ResetAuthDto {
  @IsString()
  password: string;
}
