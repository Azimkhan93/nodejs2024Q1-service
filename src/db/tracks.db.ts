import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';
import { ITrack } from 'src/tracks/interfaces/track.interface';
import { v4 as uuidv4 } from 'uuid';

const tracks: ITrack[] = [
  {
    id: uuidv4(),
    name: 'song',
    artistId: null,
    albumId: null, // refers to Track
    duration: 60, // integer number
  },
];

class TrackDb {
  private tracks = tracks;

  getTracks() {
    return this.tracks;
  }

  getTrackById(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  addTrack(newTrack: ITrack) {
    this.tracks.push(newTrack);
  }

  updateTrackById(id: string, updatedTrack: UpdateTrackDto) {
    this.tracks = this.tracks.map((track) =>
      track.id === id
        ? {
            ...track,
            ...updatedTrack,
          }
        : track,
    );
  }

  deleteTrack(id: string) {
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }

  deleteArtist(artistId: string) {
    this.tracks = this.tracks.map((track) =>
      track.artistId === artistId ? { ...track, artistId: null } : track,
    );
  }

  deleteAlbum(albumId: string) {
    this.tracks = this.tracks.map((track) =>
      track.albumId === albumId ? { ...track, albumId: null } : track,
    );
  }
}

export const trackDb = new TrackDb();
