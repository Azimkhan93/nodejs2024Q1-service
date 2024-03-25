import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { IArtist } from 'src/artists/interfaces/artist.interface';
import { v4 as uuidv4 } from 'uuid';

const artists: IArtist[] = [
  {
    id: uuidv4(),
    name: 'Mozart',
    grammy: false,
  },
];

class ArtistDb {
  private artists = artists;

  getArtists() {
    return this.artists;
  }

  getArtistById(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  addArtist(newArtist: IArtist) {
    this.artists.push(newArtist);
  }

  updateArtistById(id: string, updatedArtist: UpdateArtistDto) {
    this.artists = this.artists.map((artist) =>
      artist.id === id
        ? {
            ...artist,
            ...updatedArtist,
          }
        : artist,
    );
  }

  deleteArtist(id: string) {
    this.artists = this.artists.filter((artist) => artist.id !== id);
  }
}

export const artistDb = new ArtistDb();
