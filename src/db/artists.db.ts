import { Artist } from 'src/artists/interfaces/artist.interface';
import { v4 as uuidv4 } from 'uuid';

export const artists: Artist[] = [
  {
    id: uuidv4(),
    name: 'Mozart',
    grammy: false,
  },
];
