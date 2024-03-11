// import { PartialType } from '@nestjs/swagger';
// import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
  oldPassword: string;
  newPassword: string;
}
