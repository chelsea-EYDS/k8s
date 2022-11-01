import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async getOne(id: number): Promise<User> {
    return await this.userRepo.findOne({ where: { id } });
  }

  async createUser(createUserDTO): Promise<unknown> {
    return await this.userRepo.save(await this.userRepo.create(createUserDTO));
  }

  async updateUser(id, updateUserDTO): Promise<unknown> {
    const user = await this.userRepo.findOne({ where: { id } });
    const updateUser = {
      ...user,
      ...updateUserDTO,
    };
    return await this.userRepo.save(updateUser);
  }
}
