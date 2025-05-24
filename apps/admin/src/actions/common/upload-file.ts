'use server';

import {
  UploadApiResponse,
  UploadApiErrorResponse,
  cloudinaryConfig,
} from '@repo/shared/cloudinary';

const uploadFileToCloud = async (formData: FormData): Promise<UploadApiResponse> => {
  const file = formData.get('file');
  if (!(file instanceof File)) {
    throw new Error('No valid file provided');
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinaryConfig.uploader.upload_stream(
        { resource_type: 'auto' },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Upload failed: No result returned'));
          resolve(result);
        },
      );
      stream.end(buffer);
    });

    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Upload failed');
  }
};

export default uploadFileToCloud;
