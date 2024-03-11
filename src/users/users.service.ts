import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users } from 'src/db/users.db';
import { User } from './interfaces/user.interface';
import { v4 as uuidv4, validate } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = users;
  create(createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password) {
      throw new BadRequestException('body does not contain required fields');
    }

    const newUser = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    this.users.push(newUser);
    delete newUser.password;
    return newUser;
  }

  findAll() {
    return this.users.map((user) => {
      const userCopy = { ...user };
      delete userCopy.password;
      return userCopy;
    });
  }

  findOne(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('Not found user');
    }
    // const copyUser = user;
    const userCopy = { ...user };
    delete userCopy.password;
    // console.log('copyUser', copyUser);
    return userCopy;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!validate(id)) {
      throw new BadRequestException('invalid id (not uuid)');
    }

    if (!updateUserDto.oldPassword && !updateUserDto.newPassword) {
      throw new BadRequestException(
        'Old password or new password is not defined',
      );
    }

    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    const user = this.users.find((user) => user.id === id);

    if (updateUserDto.oldPassword !== user.password) {
      throw new ForbiddenException('oldPassword is wrong');
    }
    const updatedVersion = user.version + 1;
    const newPassword = updateUserDto.newPassword;

    const updatedUser = {
      ...user,
      password: newPassword,
      updatedAt: Date.now(),
      version: updatedVersion,
    };
    this.users[index] = updatedUser;
    const result = { ...updatedUser };

    delete result.password;
    return result;
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('invalid id (not uuid)');
    }
    if (!this.users.find((user) => user.id === id)) {
      throw new NotFoundException('userId does not exist');
    }
    if (this.users.find((user) => user.id === id)) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return;
  }
}
