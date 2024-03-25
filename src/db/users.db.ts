import { IUser } from 'src/users/interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';

const users: IUser[] = [
  {
    id: uuidv4(),
    login: 'login',
    password: '123456',
    version: 1,
    createdAt: 1709924576109,
    updatedAt: 1709924576109,
  },
];

const getUserWithoutPassword = (user: IUser): Omit<IUser, 'password'> => {
  const userWithoutPassword = { ...user };
  delete userWithoutPassword.password;
  return userWithoutPassword;
};
class UserDb {
  private users: IUser[] = users;

  getUsers(): Omit<IUser, 'password'>[] {
    return this.users.map((user) => {
      return getUserWithoutPassword(user);
    });
  }

  getUserByIdWithPassword(id: string) {
    return this.users.find((user) => user.id === id);
  }

  getUserById(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      return getUserWithoutPassword(user);
    }
  }

  addUser(newUser: IUser) {
    this.users.push(newUser);
    return getUserWithoutPassword(newUser);
  }

  updateUserById(id: string, updatedUser: IUser) {
    this.users = this.users.map((user) =>
      user.id === id
        ? {
            ...user,
            ...updatedUser,
          }
        : user,
    );
  }

  deleteUser(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}

export const userDb = new UserDb();
