"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const category_model_1 = require("../models/category.model");
const product_model_1 = require("../models/product.model");
const product_category_model_1 = require("../models/product-category.model");
const product_image_model_1 = require("../models/product-image.model");
const product_price_model_1 = require("../models/product-price.model");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: 'test_p',
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: '',
    models: [category_model_1.Category, product_model_1.Product, product_category_model_1.ProductCategory, product_image_model_1.ProductImage, product_price_model_1.ProductPrice],
});
exports.default = sequelize;
