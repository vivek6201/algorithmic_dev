import bcryptjs from 'bcryptjs';

export const cloudinaryEnv = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? '',
  apiKey: process.env.CLOUDINARY_API_KEY ?? '',
  apiSecret: process.env.CLOUDINARY_API_SECRET ?? '',
};

export const hashPass = (data: string) => {
  return bcryptjs.hashSync(data, 10);
};
