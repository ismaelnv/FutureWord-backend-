import { Product } from "src/products/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('image')
export class Image{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 600 })
    url: string;

    @Column({ name:'url_statica', type: 'varchar', length: 600 })
    urlStatica: string;

    @ManyToOne(() => Product, (product) => product.images)
    product: Product;
}