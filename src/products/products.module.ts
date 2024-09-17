import { forwardRef, Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { productRepository } from './product.repository';
import { DatabaseModule } from 'src/database/database.module'; 
import { CollectionsModule } from 'src/collections/collections.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => CollectionsModule)],
  controllers: [ProductsController],
  providers: [ProductsService, ...productRepository],
  exports: [ProductsService]
})
export class ProductsModule {}
