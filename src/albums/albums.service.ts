import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { validate } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAlbumDto: CreateAlbumDto) {
    if (!createAlbumDto.name || !createAlbumDto.year) {
      throw new BadRequestException('body does not contain required fields');
    }

    const newAlbum = await this.prisma.album.create({ data: createAlbumDto });
    return newAlbum;
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException('Album with such id was not found');
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!validate(id)) {
      throw new BadRequestException('invalid id (not uuid)');
    }

    if (!updateAlbumDto.name && !updateAlbumDto.year) {
      throw new BadRequestException('Name or grammy is not defined');
    }

    if (
      typeof updateAlbumDto.name !== 'string' &&
      typeof updateAlbumDto.year !== 'number' &&
      typeof updateAlbumDto.artistId !== 'string'
    ) {
      throw new BadRequestException('Type of name or grammy is not valid');
    }

    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException('User not found');
    }

    const updatedAlbum = await this.prisma.album.update({
      where: { id },
      data: updateAlbumDto,
    });
    return updatedAlbum;
  }

  async remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('invalid id (not uuid)');
    }

    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException('Album with such id was not found');
    }

    const favorites = await this.prisma.favorites.findMany({
      where: {
        albums: { some: { id } },
      },
    });
    for (const favorite of favorites) {
      await this.prisma.favorites.update({
        where: { id: favorite.id },
        data: {
          albums: {
            disconnect: {
              id,
            },
          },
        },
      });
    }

    await this.prisma.album.delete({ where: { id } });
    await this.prisma.track.deleteMany({ where: { albumId: id } });
  }
}
