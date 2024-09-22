import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "./product.model";
import { Category } from "./category.model";

@Table
export class ProductCategory extends Model {
    @ForeignKey(() => Product)
    @Column
    productId: number;

    @ForeignKey(() => Category)
    @Column
    categoryId: number;
}
