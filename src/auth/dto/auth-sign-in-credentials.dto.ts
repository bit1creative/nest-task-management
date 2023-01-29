import { IsString } from 'class-validator';

export class AuthSignInCredentialsDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
