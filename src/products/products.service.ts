import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CollectionsService } from 'src/collections/collections.service';
import { Collection } from 'src/collections/collection.entity';

@Injectable()
export class ProductsService {

    constructor(@Inject('PRODUCT_REPOSITORY') private readonly _productRepository: Repository<Product>,
    private _collectionService: CollectionsService){}

    public async getProductAll(): Promise<Product[]>{

        return await this._productRepository.find({relations:['images']});
    }

    public async createProduct( product: Partial<Product>, collectionCode?: number): Promise<Product>{

        let collection: Collection = null;

        if (collectionCode !== 0) {

            collection = await this._collectionService.getIdCollection(collectionCode);
        }

        product.collections = [collection];
    
        const newProduct = this._productRepository.create(product);

        if(!newProduct){

            throw new NotFoundException('Error al crear el producto');
        }

        return await this._productRepository.save(newProduct);
    }

    public async searchProductById(id: number): Promise<Product>{

        if(id == 0 || id == null){

            throw new BadRequestException('Ingrese un id valido');
        }

        return this._productRepository.findOne({where:{id}, relations:["images"]});
    }

    public async searchProducts(query: string): Promise<Product[]> {
         
        if (!query) {

            throw new BadRequestException('Ingrese algo para buscar');
        }

        let products: Product[] = await this._productRepository.find({
        
            where: { title: Like(`%${query}%`) },
            relations:["images"]
        });

        if(!products || products.length === 0){

            throw new NotFoundException('La búsqueda no ha devuelto ningún resultado.');
        }

        return products;
    }
}
