import { DataSource } from "typeorm";
import { Collection } from "./collection.entity";

export const collectionRepository = [

    {

      provide: 'COLLECTION_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Collection),
      inject: ['DATA_SOURCE'],
    },
];