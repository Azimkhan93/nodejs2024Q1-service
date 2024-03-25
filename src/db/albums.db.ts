import { UpdateAlbumDto } from 'src/albums/dto/update-album.dto';
import { IAlbum } from 'src/albums/interfaces/album.interface';
import { v4 as uuidv4 } from 'uuid';

const albums: IAlbum[] = [
  {
    id: uuidv4(),
    name: 'Disco',
    year: 2023,
    artistId: null,
  },
];

class AlbumDb {
  private albums = albums;

  getAlbums() {
    return this.albums;
  }

  getAlbumById(id: string) {
    return this.albums.find((album) => album.id === id);
  }

  addAlbum(newAlbum: IAlbum) {
    this.albums.push(newAlbum);
  }

  updateAlbumById(id: string, updatedAlbum: UpdateAlbumDto) {
    this.albums = this.albums.map((album) =>
      album.id === id
        ? {
            ...album,
            ...updatedAlbum,
          }
        : album,
    );
  }

  deleteAlbum(id: string) {
    this.albums = this.albums.filter((album) => album.id !== id);
  }

  deleteArtist(artistId: string) {
    this.albums = this.albums.map((album) =>
      album.artistId === artistId ? { ...album, artistId: null } : album,
    );
  }
}

export const albumDb = new AlbumDb();
