import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductDto } from './Dto/createProductDto';

@Controller('products')
export class ProductsController {

    
    constructor(private readonly _productService: ProductsService){}

    @Get()
    public async getProductAll(): Promise<Product[]>{

        return await this._productService.getProductAll();
    }

    @Post()
    public async createProduct(@Body() createProductDto: Partial<CreateProductDto>): Promise<Product>{

        const { product, collectionCode } = createProductDto;
        return await this._productService.createProduct(product,collectionCode);
    }

    @Get(':id')
    public async searchProductById(@Param('id') id: number): Promise<Product>{
        
        console.log("consulta"+id)
        return this._productService.searchProductById(id);
    }

    @Get('/search/product')
    public async searchProducts(@Query('title') title: string): Promise<Product[]> {

        return await this._productService.searchProducts(title);
    }
}
