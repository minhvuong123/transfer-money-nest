import { User } from '../typeorm';

export enum Routes {
  AUTH = 'auth',
  USER = 'user',
}

export enum Services {
  AUTH = 'AUTH_SERVICE',
  USERS = 'AUSERS_SERVICE',
}

export const findUserSelectors: (keyof User)[] = [
  'id',
  'firstName',
  'lastName',
  'username',
  'created_at',
];

export const getUserSelectors = (selectPassword?: boolean): (keyof User)[] => {
  return selectPassword
    ? [...findUserSelectors, 'password']
    : findUserSelectors;
};
