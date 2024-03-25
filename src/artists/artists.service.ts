import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { validate } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    if (!createArtistDto.name || !createArtistDto.grammy) {
      throw new BadRequestException('body does not contain required fields');
    }

    const newArtist = await this.prisma.artist.create({
      data: createArtistDto,
    });
    return newArtist;
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new NotFoundException('Artist with such id was not found');
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!validate(id)) {
      throw new BadRequestException('invalid id (not uuid)');
    }

    if (!updateArtistDto.name && !updateArtistDto.grammy) {
      throw new BadRequestException('Name or grammy is not defined');
    }

    if (
      typeof updateArtistDto.name !== 'string' &&
      typeof updateArtistDto.grammy !== 'boolean'
    ) {
      throw new BadRequestException('Type of name or grammy is not valid');
    }

    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new NotFoundException('Artist is not found');
    }

    const updatedArtist = await this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });
    return updatedArtist;
  }

  async remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('invalid id (not uuid)');
    }
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new NotFoundException('Artist with such id was not found');
    }

    await this.prisma.artist.delete({ where: { id } });
  }
}
