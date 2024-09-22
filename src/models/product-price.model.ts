import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "./product.model";

@Table
export class ProductPrice extends Model {
    @ForeignKey(() => Product)
    @Column
    productId: number;

    @Column
    price: number;
}
