import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { validate } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}
  async getOrMakeFavorite() {
    const favorites = await this.prisma.favorites.findFirst();
    if (!favorites) {
      return await this.prisma.favorites.create({ data: {} });
    }
    return favorites;
  }

  async findAll() {
    await this.getOrMakeFavorite();
    const favorites = await this.prisma.favorites.findFirst({
      select: {
        artists: {
          select: {
            id: true,
            name: true,
            grammy: true,
          },
        },
        tracks: {
          select: {
            id: true,
            duration: true,
            name: true,
            artistId: true,
            albumId: true,
          },
        },
        albums: {
          select: { id: true, name: true, artistId: true, year: true },
        },
      },
    });
    return favorites;
  }

  async addTrack(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const track = await this.prisma.track.findFirst({ where: { id } });
    if (!track) {
      throw new UnprocessableEntityException(
        'Track with such id was not found',
      );
    }

    let favorites = await this.prisma.favorites.findFirst();
    if (!favorites) {
      favorites = await this.prisma.favorites.create({
        data: {
          tracks: { connect: { id } },
        },
      });
    }
    await this.prisma.favorites.update({
      where: { id: favorites.id },
      data: {
        tracks: {
          connect: { id },
        },
      },
    });
    return track;
  }

  async removeTrack(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('invalid id (not uuid)');
    }
    const track = await this.prisma.track.findFirst({
      where: { id },
      select: { favoritesId: true },
    });
    if (!track) {
      throw new NotFoundException('Track with such id was not found');
    }

    await this.prisma.track.update({
      where: { id },
      data: {
        favoritesId: null,
      },
    });
  }

  async addAlbum(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const album = await this.prisma.album.findFirst({ where: { id } });
    if (!album) {
      throw new UnprocessableEntityException(
        'Album with such id was not found',
      );
    }

    let favorites = await this.prisma.favorites.findFirst();
    if (!favorites) {
      favorites = await this.prisma.favorites.create({
        data: {
          albums: { connect: { id } },
        },
      });
    }
    await this.prisma.favorites.update({
      where: { id: favorites.id },
      data: {
        albums: {
          connect: { id },
        },
      },
    });
    return album;
  }

  async removeAlbum(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('invalid id (not uuid)');
    }

    const album = await this.prisma.album.findFirst({
      where: { id },
      select: { favoritesId: true },
    });

    if (!album) {
      throw new NotFoundException('Album with such id was not found');
    }

    await this.prisma.album.update({
      where: { id },
      data: {
        favoritesId: null,
      },
    });
  }

  async addArtist(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const artist = await this.prisma.artist.findFirst({ where: { id } });
    if (!artist) {
      throw new UnprocessableEntityException(
        'Artist with such id was not found',
      );
    }
    let favorites = await this.prisma.favorites.findFirst();
    if (!favorites) {
      favorites = await this.prisma.favorites.create({
        data: {
          artists: { connect: { id } },
        },
      });
    }
    await this.prisma.favorites.update({
      where: { id: favorites.id },
      data: {
        artists: {
          connect: { id },
        },
      },
    });
    return artist;
  }

  async removeArtist(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('invalid id (not uuid)');
    }
    const artist = await this.prisma.artist.findFirst({
      where: { id },
      select: { favoritesId: true },
    });

    if (!artist) {
      throw new NotFoundException('Artist with such id was not found');
    }
    await this.prisma.artist.update({
      where: { id },
      data: {
        favoritesId: null,
      },
    });
  }
}
