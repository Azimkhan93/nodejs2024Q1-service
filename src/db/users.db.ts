import { User } from 'src/users/interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';

export const users: User[] = [
  {
    id: uuidv4(),
    login: 'login',
    password: '123456',
    version: 1,
    createdAt: 1709924576109,
    updatedAt: 1709924576109,
  },
];
