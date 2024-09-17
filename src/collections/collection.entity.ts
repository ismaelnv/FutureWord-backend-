import { Product } from "src/products/product.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('collection')
export class Collection{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 300 })
    title: string;

    @Column({ type: 'varchar', length: 300 })
    handle?: string;

    @ManyToMany(() => Product, product => product.collections)
    @JoinTable({

        name: 'product_collection', // Nombre de la tabla intermedia
        joinColumn: {

            name: 'product_id', // Nombre de la columna para Product
            referencedColumnName: 'id', // Referencia a la columna 'id' de Product
        },
        inverseJoinColumn: {

            name: 'collection_id', // Nombre de la columna para Category
            referencedColumnName: 'id', // Referencia a la columna 'id' de Category
        }
    })
    products: Product[]
}