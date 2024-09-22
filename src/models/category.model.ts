import {BelongsToMany, Column, Model, Table} from "sequelize-typescript";
import {ProductCategory} from "./product-category.model";
import {Product} from "./product.model";

@Table
export class Category extends Model {
    @Column
    name: string;

    @BelongsToMany(() => Product, () => ProductCategory)
    categories: Product[];
}
