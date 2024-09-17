import { forwardRef, Module } from '@nestjs/common';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';
import { DatabaseModule } from 'src/database/database.module';
import { collectionRepository } from './collection.repository';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => ProductsModule)],
  controllers: [CollectionsController],
  providers: [CollectionsService, ...collectionRepository],
  exports: [CollectionsService]
})
export class CollectionsModule {}
