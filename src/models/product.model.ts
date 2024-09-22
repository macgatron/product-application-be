import {BelongsToMany, Column, ForeignKey, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import { ProductPrice } from "./product-price.model";
import { ProductImage } from "./product-image.model";
import { IProduct } from "../services/panelo/dto/panelo-product.dto";
import {Category} from "./category.model";
import {ProductCategory} from "./product-category.model";

@Table
export class Product extends Model {
    @Column
    userId: number;

    @Column
    title: string;

    @Column
    slug: string;

    @Column
    lang: string;

    @Column
    status: number;

    @Column
    count: number;

    @Column
    stock: number;

    @HasOne(() => ProductPrice)
    price: ProductPrice;

    @HasMany(() => ProductImage)
    images: ProductImage[];

    @BelongsToMany(() => Category, () => ProductCategory)
    categories: ProductCategory[];

    isInValidData(product: IProduct) {
        return this.title !== product.title ||
            this.userId !== product.auth_id ||
            this.slug !== product.slug ||
            this.lang !== product.lang ||
            this.status !== product.status ||
            this.stock !== (product.stock?.stock ?? 0) ||
            this.count !== product.count;
    }
}
