"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Update = exports.GetById = exports.Delete = exports.Create = exports.ExportCSV = exports.ExportXML = exports.GetCategories = exports.GetPaginatedProducts = exports.Synchronize = void 0;
const PaneloService = __importStar(require("./panelo/panelo.service"));
const category_model_1 = require("../models/category.model");
const product_model_1 = require("../models/product.model");
const product_price_model_1 = require("../models/product-price.model");
const product_image_model_1 = require("../models/product-image.model");
const product_category_model_1 = require("../models/product-category.model");
const { json2xml } = require('xml-js');
const Synchronize = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const categories = yield PaneloService.GetProducts();
    for (const category of categories) {
        /**
         * Sync categories
         */
        let dbCategory = yield category_model_1.Category.findOne({ where: { id: category.id } });
        if (!dbCategory) {
            dbCategory = yield category_model_1.Category.create({ id: category.id, name: category.name });
        }
        else {
            if (dbCategory.name !== category.name) {
                yield category_model_1.Category.update({ name: category.name }, { where: { id: category.id } });
            }
        }
        /**
         * Sync products
         */
        for (const product of category.products) {
            let dbProduct = yield product_model_1.Product.findOne({ where: { id: product.id }, include: [product_price_model_1.ProductPrice, product_image_model_1.ProductImage] });
            if (!dbProduct) {
                dbProduct = yield product_model_1.Product.create(Object.assign(Object.assign({}, product), { userId: product.auth_id, stock: (_b = (_a = product.stock) === null || _a === void 0 ? void 0 : _a.stock) !== null && _b !== void 0 ? _b : 0 }));
            }
            else {
                if (dbProduct.isInValidData(product)) {
                    yield product_model_1.Product.update({
                        title: product.title,
                        slug: product.slug,
                        lang: product.lang,
                        status: product.status,
                        count: product.count,
                        stock: (_d = (_c = product.stock) === null || _c === void 0 ? void 0 : _c.stock) !== null && _d !== void 0 ? _d : 0,
                    }, { where: { id: product.id } });
                }
            }
            /**
             * Product categories
             */
            yield product_category_model_1.ProductCategory.destroy({ where: { productId: dbProduct.id, categoryId: dbCategory.id } });
            yield product_category_model_1.ProductCategory.create({ productId: dbProduct.id, categoryId: dbCategory.id });
            /**
             * Product Price
             */
            if (!dbProduct.price) {
                yield product_price_model_1.ProductPrice.create({ productId: dbProduct.id, price: (_f = (_e = product.price) === null || _e === void 0 ? void 0 : _e.price) !== null && _f !== void 0 ? _f : 0 });
            }
            else {
                if (dbProduct.price.price !== product.price.price) {
                    yield product_price_model_1.ProductPrice.update({ price: product.price.price }, { where: { id: product.price.id } });
                }
            }
            /**
             * Product Images
             */
            if (product.preview) {
                yield product_image_model_1.ProductImage.destroy({ where: { productId: product.id } });
                yield product_image_model_1.ProductImage.create({ productId: product.id, type: product.type, content: product.preview.content });
            }
        }
    }
    return true;
});
exports.Synchronize = Synchronize;
const GetPaginatedProducts = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10, category } = options;
    const offset = (Number(page) - 1) * Number(limit);
    let query;
    if (category) {
        query = { id: category };
    }
    const { rows, count } = yield product_model_1.Product.findAndCountAll({
        limit: Number(limit),
        offset: Number(offset),
        include: [product_image_model_1.ProductImage, product_price_model_1.ProductPrice, { model: category_model_1.Category, where: query }],
    });
    return {
        data: rows,
        limit,
        totalItems: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
    };
});
exports.GetPaginatedProducts = GetPaginatedProducts;
const GetCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    return category_model_1.Category.findAll();
});
exports.GetCategories = GetCategories;
const ExportXML = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.Product.findAll({ include: [product_image_model_1.ProductImage, category_model_1.Category, product_price_model_1.ProductPrice] });
    const mappedProducts = mapProducts(products);
    return json2xml({
        products: {
            product: mappedProducts,
        },
    }, { compact: true, ignoreComment: true, spaces: 4 });
});
exports.ExportXML = ExportXML;
const ExportCSV = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.Product.findAll({ include: [product_image_model_1.ProductImage, category_model_1.Category, product_price_model_1.ProductPrice] });
    const mappedProducts = mapProducts(products);
    return convertToCSV(mappedProducts);
});
exports.ExportCSV = ExportCSV;
const Create = (dto) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.create(dto);
    yield product_price_model_1.ProductPrice.create({ productId: product.id, price: dto.price });
    const category = yield category_model_1.Category.findOne({ where: { id: dto.category } });
    if (category) {
        yield product_category_model_1.ProductCategory.create({ productId: product.id, categoryId: dto.category });
    }
    return product;
});
exports.Create = Create;
const Update = (productId, dto) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findOne({ where: { id: productId }, include: [product_image_model_1.ProductImage, category_model_1.Category, product_price_model_1.ProductPrice] });
    if (!product) {
        return false;
    }
    yield product_model_1.Product.update(dto, { where: { id: product.id } });
    yield product_price_model_1.ProductPrice.update({ price: dto.price }, { where: { productId: product.id } });
    yield product_category_model_1.ProductCategory.destroy({ where: { productId: product.id } });
    const category = yield category_model_1.Category.findOne({ where: { id: dto.category } });
    if (category) {
        yield product_category_model_1.ProductCategory.create({ productId: product.id, categoryId: dto.category });
    }
    return GetById(productId);
});
exports.Update = Update;
const GetById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    return ((_a = yield product_model_1.Product.findOne({ where: { id: productId }, include: [product_image_model_1.ProductImage, category_model_1.Category, product_price_model_1.ProductPrice] })) !== null && _a !== void 0 ? _a : undefined);
});
exports.GetById = GetById;
const Delete = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.Product.destroy({ where: { id: productId } });
});
exports.Delete = Delete;
function mapProducts(products) {
    return products.map((product) => {
        var _a, _b;
        return {
            id: product.id,
            name: product.title,
            image: Array.isArray(product.images) && product.images.length > 0 ? (_a = product.images[0]) === null || _a === void 0 ? void 0 : _a.content : '',
            stock: product.stock,
            price: (_b = product.price) === null || _b === void 0 ? void 0 : _b.price,
        };
    });
}
const convertToCSV = (data) => {
    const headers = Object.keys(data[0]);
    const csvRows = data.map((row) => headers.map(header => row[header]).join(','));
    return [headers.join(','), ...csvRows].join('\n');
};
