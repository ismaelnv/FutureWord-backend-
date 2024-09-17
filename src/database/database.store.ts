import { Collection } from 'src/collections/collection.entity';
import { Image } from 'src/images/image.entity';
import { Product } from 'src/products/product.entity';
import { DataSource } from 'typeorm';

export const databasestore = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'store',
        entities: [Image,Product,Collection],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];