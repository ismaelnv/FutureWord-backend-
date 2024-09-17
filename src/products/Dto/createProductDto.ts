import { Product } from "../product.entity";

export class CreateProductDto{

    product: Partial<Product>;
    collectionCode?: number;
}