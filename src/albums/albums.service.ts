import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';
import { albums } from 'src/db/albums.db';
import { v4 as uuidv4, validate } from 'uuid';

@Injectable()
export class AlbumsService {
  private albums: Album[] = albums;

  create(createAlbumDto: CreateAlbumDto) {
    if (!createAlbumDto.name || !createAlbumDto.year) {
      throw new BadRequestException('body does not contain required fields');
    }

    const newAlbum = {
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: null,
    };

    this.albums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album with such id was not found');
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
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

    const index = this.albums.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    const album = this.albums.find((album) => album.id === id);

    const updatedAlbum = {
      ...album,
      name: updateAlbumDto.name,
      year: updateAlbumDto.year,
      artistId: updateAlbumDto.artistId,
    };
    this.albums[index] = updatedAlbum;
    return updatedAlbum;
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('invalid id (not uuid)');
    }
    if (!this.albums.find((album) => album.id === id)) {
      throw new NotFoundException('Album with such id was not found');
    }
    if (this.albums.find((album) => album.id === id)) {
      this.albums = this.albums.filter((album) => album.id !== id);
    }
    return;
  }
}
