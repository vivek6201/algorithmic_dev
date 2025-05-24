import bcryptjs from 'bcryptjs';

export const hashPass = (data: string) => {
  return bcryptjs.hashSync(data, 10);
};
