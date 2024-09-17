import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Image } from './image.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ImagesService {

    private readonly urlStatic = "http://localhost:8080/images-static/";

    constructor(@Inject('IMAGE_REPOSITORY') private readonly _imageRepository: Repository<Image>, private _productService: ProductsService){}

    public async createImage(productId: number,file: Express.Multer.File): Promise<Image> {

        if (!file) {
            
            throw new BadRequestException('Ingrese una imagen valida');
        }

        const name = file.filename;
        const url = file.path;

        let image: Image = new Image();
        image.urlStatica = this.urlStatic+name;
        image.url = url;

        if(!productId){

            throw new BadRequestException('Ingrese un id valido');
        }

        const product = await this._productService.searchProductById(productId);

        if(!product){

            throw new NotFoundException('Error no se pudo encontrar el producto');
        }

        image.product = product;
        const newImage =  this._imageRepository.create(image);
        return await this._imageRepository.save(newImage);
    }
}
