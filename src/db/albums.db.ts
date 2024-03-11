import { Album } from 'src/albums/interfaces/album.interface';
import { v4 as uuidv4 } from 'uuid';

export const albums: Album[] = [
  {
    id: uuidv4(),
    name: 'Disco',
    year: 2023,
    artistId: null,
  },
];
