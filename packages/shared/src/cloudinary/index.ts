import { v2 as cloudinary } from 'cloudinary';

export const cloudinaryConfig = (cloudName: string, apiKey: string, apiSecret: string) => {
  return cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
};

export * from 'cloudinary';
export { cloudinary };
