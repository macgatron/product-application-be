import { Sequelize } from 'sequelize-typescript';
import { Category } from "../models/category.model";
import { Product } from "../models/product.model";
import { ProductCategory } from "../models/product-category.model";
import { ProductImage } from "../models/product-image.model";
import { ProductPrice } from "../models/product-price.model";

const sequelize = new Sequelize({
    database: 'test_p',
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: '',
    models: [Category, Product, ProductCategory, ProductImage, ProductPrice],
});

export default sequelize;
