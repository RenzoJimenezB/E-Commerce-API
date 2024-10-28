import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class CreateAdminDto extends OmitType(CreateUserDto, [
  'phone',
  'country',
  'city',
  'address',
]) {}
