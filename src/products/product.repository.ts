import { DataSource } from "typeorm";
import { Product } from "./product.entity";

export const productRepository = [

  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
    inject: ['DATA_SOURCE'],
  },
];