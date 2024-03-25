import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validate } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password) {
      throw new BadRequestException('body does not contain required fields');
    }

    const newUser = await this.prisma.user.create({ data: createUserDto });

    return await this.getUserWithoutPassword(newUser);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => {
      return this.getUserWithoutPassword(user);
    });
  }

  async findOne(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Not found user');
    }
    return await this.getUserWithoutPassword(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!validate(id)) {
      throw new BadRequestException('invalid id (not uuid)');
    }

    if (!updateUserDto.oldPassword && !updateUserDto.newPassword) {
      throw new BadRequestException(
        'Old password or new password is not defined',
      );
    }

    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.oldPassword !== user.password) {
      throw new ForbiddenException('oldPassword is wrong');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: updateUserDto.newPassword,
        version: {
          increment: 1,
        },
      },
    });

    return await this.getUserWithoutPassword(updatedUser);
  }

  async remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('invalid id (not uuid)');
    }
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('userId does not exist');
    }
    await this.prisma.user.delete({ where: { id } });
  }

  getUserWithoutPassword = async (user: User) => {
    const userWithoutPassword = {
      ...user,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
    };
    delete userWithoutPassword.password;
    return userWithoutPassword;
  };
}
