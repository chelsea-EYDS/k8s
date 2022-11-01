import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsString()
  username: string;

  @IsString()
  email: string;

  constructor(data?: Partial<CreateUserDTO>) {
    Object.assign(this, data);
  }
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
