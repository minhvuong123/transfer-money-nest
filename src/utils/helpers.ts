import * as bcrypt from 'bcrypt';

export const hasPassword = (password: string) => {
  return bcrypt.hash(password, bcrypt.genSaltSync(10));
};

export const compareHash = (compareValue: string, hash: string) => {
  return bcrypt.compare(compareValue, hash);
};
