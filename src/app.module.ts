import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CollectionsModule } from './collections/collections.module';
import { ImagesModule } from './images/images.module';
import { DatabaseModule } from './database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ ServeStaticModule.forRoot({

    rootPath: join(__dirname, '..', 'image'),
    serveRoot:'/images-static',
  }),

    ProductsModule, CollectionsModule, ImagesModule, DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
