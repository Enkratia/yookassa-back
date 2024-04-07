import { IsEmail } from 'class-validator';

export class ForgotAuthDto {
  @IsEmail()
  email: string;
}
