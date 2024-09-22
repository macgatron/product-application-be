import { Sequelize } from 'sequelize-typescript';
import { Category } from "../models/category.model";
import { Product } from "../models/product.model";
import { ProductCategory } from "../models/product-category.model";
import { ProductImage } from "../models/product-image.model";
import { ProductPrice } from "../models/product-price.model";
import config from "./env.config";
import {Dialect} from "sequelize";

const sequelize = new Sequelize( config.database.db, config.database.username, config.database.password, {
    host: config.database.host,
    dialect: config.database.driver as Dialect,
    models: [Category, Product, ProductCategory, ProductImage, ProductPrice],
});

export default sequelize;
