import { Module } from '@nestjs/common';
import {databasestore} from './database.store'

@Module({

    providers: [...databasestore],
    exports: [...databasestore],
})
export class DatabaseModule {}
