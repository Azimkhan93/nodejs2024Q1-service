import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validate } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    if (!createTrackDto.name || !createTrackDto.duration) {
      throw new BadRequestException('body does not contain required fields');
    }

    const newTrack = await this.prisma.track.create({ data: createTrackDto });
    return newTrack;
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException('Artist with such id was not found');
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!validate(id)) {
      throw new BadRequestException('invalid id (not uuid)');
    }

    if (!updateTrackDto.name && !updateTrackDto.duration) {
      throw new BadRequestException('Name or duration is not defined');
    }

    if (
      typeof updateTrackDto.name !== 'string' &&
      typeof updateTrackDto.duration !== 'number'
    ) {
      throw new BadRequestException('Type of name or duraton is not valid');
    }

    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException('Track is not found');
    }

    const updatedTrack = await this.prisma.track.update({
      where: { id },
      data: updateTrackDto,
    });
    return updatedTrack;
  }

  async remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('invalid id (not uuid)');
    }
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException('Artist with such id was not found');
    }

    const favorites = await this.prisma.favorites.findMany({
      where: {
        tracks: { some: { id } },
      },
    });
    for (const favorite of favorites) {
      await this.prisma.favorites.update({
        where: { id: favorite.id },
        data: {
          tracks: {
            disconnect: {
              id,
            },
          },
        },
      });
    }

    await this.prisma.track.delete({ where: { id } });
  }
}
