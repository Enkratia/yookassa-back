import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import path from 'path';

import sharp from 'sharp';
import sizeOf from 'image-size';

const mimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];

const processMultiple = async (images: Express.Multer.File[]) => {
  return await Promise.all(
    images.map(async (image) => {
      return await processSingle(image);
    }),
  );
};

const processSingle = async (image: Express.Multer.File) => {
  if (!mimeTypes.includes(image.mimetype)) {
    throw new BadRequestException('Invalid mimetype');
  }

  const ext = path.parse(image.originalname).ext;

  const { width, height } = sizeOf(image.buffer);
  const filename = Date.now() + '-' + width + 'x' + height + ext;

  switch (ext) {
    case '.svg':
      await sharp(image.buffer).toFile(path.join('images', filename));
      break;
    case '.png':
      await sharp(image.buffer).png().toFile(path.join('images', filename));
      break;
    default:
      await sharp(image.buffer)
        .jpeg({ mozjpeg: true, quality: 100 })
        .toFile(path.join('images', filename));
  }

  return process.env.BACKEND_URL + '/images/' + filename;
};

@Injectable()
export class SharpPipe
  implements
    PipeTransform<
      Express.Multer.File | Express.Multer.File[],
      Promise<string | string[] | null>
    >
{
  async transform(
    data: Express.Multer.File | Express.Multer.File[],
  ): Promise<string | string[]> {
    if (!data) return null;

    let result: string | string[];

    if (Array.isArray(data)) {
      result = await processMultiple(data);
    } else {
      result = await processSingle(data);
    }

    return result;
  }
}
