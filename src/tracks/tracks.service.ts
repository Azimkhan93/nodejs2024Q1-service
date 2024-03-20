import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validate } from 'uuid';
import { trackDb } from 'src/db/tracks.db';
// import { favoriteDb } from 'src/db/favorites.db';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTrackDto: CreateTrackDto) {
    if (!createTrackDto.name || !createTrackDto.duration) {
      throw new BadRequestException('body does not contain required fields');
    }

    // const newTrack = {
    //   id: uuidv4(),
    //   name: createTrackDto.name,
    //   artistId: createTrackDto.artistId,
    //   albumId: createTrackDto.albumId,
    //   duration: createTrackDto.duration,
    // };

    // trackDb.addTrack(newTrack);
    const newTrack = this.prisma.track.create({ data: createTrackDto });
    return newTrack;
  }

  findAll() {
    return this.prisma.track.findMany();
  }

  findOne(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const track = this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException('Artist with such id was not found');
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
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

    const track = this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException('Track is not found');
    }

    // const updatedTrack = {
    //   ...track,
    //   name: updateTrackDto.name,
    //   duration: updateTrackDto.duration,
    // };

    // trackDb.updateTrackById(id, updatedTrack);
    const updatedTrack = this.prisma.track.update({
      where: { id },
      data: updateTrackDto,
    });
    return updatedTrack;
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('invalid id (not uuid)');
    }
    const track = trackDb.getTrackById(id);
    if (!track) {
      throw new NotFoundException('Artist with such id was not found');
    }
    // trackDb.deleteTrack(id);
    // favoriteDb.deleteTrackFromFavorites(id);
    this.prisma.track.delete({ where: { id } });

    this.prisma.favorites.update({
      where: { id: '100' },
      data: {
        tracks: {
          disconnect: {
            id: id,
          },
        },
      },
    });
  }
}
