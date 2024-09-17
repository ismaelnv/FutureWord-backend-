import { Collection } from "src/collections/collection.entity";
import { Image } from "src/images/image.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('product')
export class Product{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 300 })
    title: string;

    @Column('text')
    description: string;
    
    @Column('decimal', { precision: 10, scale: 2 })
    price: number;
    
    @Column()
    quantity: number;
    
    @Column({ type: 'varchar', length: 200 })
    handle: string;
    
    @Column({ type: 'varchar', length: 200 })
    tags: string;

    @OneToMany(() => Image, (image) => image.product)
    images: Image[];

    @ManyToMany(() => Collection, collection => collection.products)
    collections: Collection[];
}