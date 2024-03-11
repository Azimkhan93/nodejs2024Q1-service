import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';
import { artists } from 'src/db/artists.db';
import { v4 as uuidv4, validate } from 'uuid';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = artists;
  create(createArtistDto: CreateArtistDto) {
    if (!createArtistDto.name || !createArtistDto.grammy) {
      throw new BadRequestException('body does not contain required fields');
    }

    const newArtist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };

    this.artists.push(newArtist);
    return newArtist;
  }

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException('Artist with such id was not found');
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
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

    const index = this.artists.findIndex((artist) => artist.id === id);
    if (index === -1) {
      throw new NotFoundException('Artist is not found');
    }

    const artist = this.artists.find((artist) => artist.id === id);

    const updatedArtist = {
      ...artist,
      name: updateArtistDto.name,
      grammy: updateArtistDto.grammy,
    };
    this.artists[index] = updatedArtist;
    return updatedArtist;
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('invalid id (not uuid)');
    }
    if (!this.artists.find((artist) => artist.id === id)) {
      throw new NotFoundException('Artist with such id was not found');
    }
    if (this.artists.find((artist) => artist.id === id)) {
      this.artists = this.artists.filter((artist) => artist.id !== id);
    }
    return;
  }
}
