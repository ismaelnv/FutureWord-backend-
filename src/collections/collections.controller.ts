import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Collection } from './collection.entity';
import { CollectionsService } from './collections.service';
import { RelationCollectionDto } from './Dto/relationCollectionDto';

@Controller('collections')
export class CollectionsController {

    constructor(private _collectionService: CollectionsService){}    

    @Get()
    public async getCollectionAll(): Promise<Collection[]>{

        return await this._collectionService.getCollectionAll();
    }

    @Post()
    public async createCollection(@Body() collection: Partial<Collection>): Promise<Collection>{

        return await this._collectionService.createCollection(collection);
    }

    @Get(':id')
    public async getIdCollection(@Param('id') id: number): Promise<Collection>{

        return this._collectionService.getIdCollection(id);
    }

    @Post('relations/products')
    public async relateListOfProductsToCollection(@Body() relationCollection:RelationCollectionDto): Promise<Collection>{

        const { codeCollection, productCodes } = relationCollection;
        return await this._collectionService.relateListOfProductsToCollection(codeCollection,productCodes);
    }
}
