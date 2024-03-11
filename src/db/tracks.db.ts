import { Track } from 'src/tracks/interfaces/track.interface';
import { v4 as uuidv4 } from 'uuid';
export const tracks: Track[] = [
  {
    id: uuidv4(),
    name: 'song',
    artistId: null,
    albumId: null, // refers to Album
    duration: 60, // integer number
  },
];
