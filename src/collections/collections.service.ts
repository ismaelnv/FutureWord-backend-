import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Collection } from './collection.entity';
import { Product } from 'src/products/product.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CollectionsService {

    constructor(@Inject('COLLECTION_REPOSITORY') private readonly _collectionRepository: Repository<Collection>, 
    @Inject(forwardRef(() => ProductsService)) private readonly _productService: ProductsService,){}

    public async getCollectionAll(): Promise<Collection[]>{

        return await this._collectionRepository.find();
    }

    public async createCollection( collection: Partial<Collection> ): Promise<Collection>{

        if(collection == null || collection == undefined || typeof collection !== 'object' ||  Object.keys(collection).length === 0){

            throw new BadRequestException('Ingrese una coleccion valida');
        }

        const newCollection = this._collectionRepository.create(collection);

        if(!newCollection){

            throw new NotFoundException('Error al crear la coleccion');
        }

        return  await this._collectionRepository.save(newCollection);
    }

    public async getIdCollection(id: number): Promise<Collection>{

        if( id == 0 || id == null || id == undefined){

            throw new BadRequestException('Ingrese un id valido');
        }

        return this._collectionRepository.findOne({where: {id}, relations: ['products','products.images']});
    }

    public async relateListOfProductsToCollection(codeCollection: number, productCodes:number[]): Promise<Collection>{

        if(codeCollection === 0 || codeCollection === null || codeCollection === undefined){

            throw new BadRequestException('Ingrese un codigo o id valido');
        }

        const collection: Collection = await this.getIdCollection(codeCollection);
        
        if (collection) {

            for (const codeProduct of productCodes) {
                
                const product: Product = await this._productService.searchProductById(codeProduct);
                    
                if (product) {
                    
                    collection.products = [...(collection.products || []), product];
                }
            }

        }

        return await this._collectionRepository.save(collection);
    }
}
