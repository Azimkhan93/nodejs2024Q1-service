import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';
import { tracks } from 'src/db/tracks.db';
import { v4 as uuidv4, validate } from 'uuid';

@Injectable()
export class TracksService {
  private tracks: Track[] = tracks;
  create(createTrackDto: CreateTrackDto) {
    if (!createTrackDto.name || !createTrackDto.duration) {
      throw new BadRequestException('body does not contain required fields');
    }

    const newTrack = {
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: null,
      albumId: null,
      duration: createTrackDto.duration,
    };

    this.tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const track = this.tracks.find((track) => track.id === id);
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

    const index = this.tracks.findIndex((track) => track.id === id);
    if (index === -1) {
      throw new NotFoundException('Track is not found');
    }

    const track = this.tracks.find((track) => track.id === id);

    const updatedTrack = {
      ...track,
      name: updateTrackDto.name,
      duration: updateTrackDto.duration,
    };
    this.tracks[index] = updatedTrack;
    return updatedTrack;
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('invalid id (not uuid)');
    }
    if (!this.tracks.find((track) => track.id === id)) {
      throw new NotFoundException('Artist with such id was not found');
    }
    if (this.tracks.find((track) => track.id === id)) {
      this.tracks = this.tracks.filter((track) => track.id !== id);
    }
    return;
  }
}
