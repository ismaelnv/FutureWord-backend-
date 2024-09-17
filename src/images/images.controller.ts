import { Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Image } from './image.entity';

@Controller('images')
export class ImagesController {

  constructor(private _imageService: ImagesService){}
    
  @Post(':productId')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: 'image',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
      },
    }),
  }))
  public async createImage(@Param('productId') productId: number, @UploadedFile() file: Express.Multer.File): Promise<Image>{

    const newImage = await this._imageService.createImage(productId,file);
    return newImage;
  }
}
