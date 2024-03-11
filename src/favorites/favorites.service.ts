import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesResponse } from './interfaces/favorites.interface';
import { favorites } from 'src/db/favorites.db';
import { validate } from 'uuid';
import { tracks } from 'src/db/tracks.db';
import { Track } from 'src/tracks/interfaces/track.interface';
import { Album } from 'src/albums/interfaces/album.interface';
import { Artist } from 'src/artists/interfaces/artist.interface';
import { albums } from 'src/db/albums.db';
import { artists } from 'src/db/artists.db';

@Injectable()
export class FavoritesService {
  private favorites: FavoritesResponse = favorites;
  private tracks: Track[] = tracks;
  private albums: Album[] = albums;
  private artists: Artist[] = artists;
  findAll() {
    return this.favorites;
  }

  addTrack(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const index = this.tracks.findIndex((track) => track.id === id);
    if (index === -1) {
      throw new UnprocessableEntityException(
        'Track with such id was not found',
      );
    }
    const track = this.tracks[index];

    this.favorites.tracks.push(track);
    return track;
  }

  removeTrack(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('invalid id (not uuid)');
    }
    if (!this.favorites.tracks.find((track) => track.id === id)) {
      throw new NotFoundException('Track with such id was not found');
    }
    if (this.favorites.tracks.find((track) => track.id === id)) {
      this.favorites.tracks = this.favorites.tracks.filter(
        (track) => track.id !== id,
      );
    }
    return;
  }
  addAlbum(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const index = this.albums.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new UnprocessableEntityException(
        'Album with such id was not found',
      );
    }
    const album = this.albums[index];

    this.favorites.albums.push(album);
    return album;
  }

  removeAlbum(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('invalid id (not uuid)');
    }
    if (!this.favorites.albums.find((album) => album.id === id)) {
      throw new NotFoundException('Album with such id was not found');
    }
    if (this.favorites.albums.find((album) => album.id === id)) {
      this.favorites.albums = this.favorites.albums.filter(
        (album) => album.id !== id,
      );
    }
    return;
  }

  addArtist(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const index = this.artists.findIndex((artist) => artist.id === id);
    if (index === -1) {
      throw new UnprocessableEntityException(
        'Artist with such id was not found',
      );
    }
    const artist = this.artists[index];

    this.favorites.artists.push(artist);
    return artist;
  }

  removeArtist(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('invalid id (not uuid)');
    }
    if (!this.favorites.artists.find((artist) => artist.id === id)) {
      throw new NotFoundException('Artist with such id was not found');
    }
    if (this.favorites.artists.find((artist) => artist.id === id)) {
      this.favorites.artists = this.favorites.artists.filter(
        (artist) => artist.id !== id,
      );
    }
    return;
  }
}
