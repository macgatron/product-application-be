import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "./product.model";

@Table
export class ProductImage extends Model {
    @ForeignKey(() => Product)
    @Column
    productId: number;

    @Column
    type: string;

    @Column
    content: string;
}
