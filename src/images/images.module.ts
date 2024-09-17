import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { ProductsModule } from 'src/products/products.module';
import { imageRepository } from './image.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({

  imports: [ProductsModule, DatabaseModule],
  controllers: [ImagesController],
  providers: [ImagesService, ...imageRepository]
})
export class ImagesModule {}
