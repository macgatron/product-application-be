"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const product_price_model_1 = require("./product-price.model");
const product_image_model_1 = require("./product-image.model");
const category_model_1 = require("./category.model");
const product_category_model_1 = require("./product-category.model");
let Product = class Product extends sequelize_typescript_1.Model {
    isInValidData(product) {
        var _a, _b;
        return this.title !== product.title ||
            this.userId !== product.auth_id ||
            this.slug !== product.slug ||
            this.lang !== product.lang ||
            this.status !== product.status ||
            this.stock !== ((_b = (_a = product.stock) === null || _a === void 0 ? void 0 : _a.stock) !== null && _b !== void 0 ? _b : 0) ||
            this.count !== product.count;
    }
};
exports.Product = Product;
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Product.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Product.prototype, "slug", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Product.prototype, "lang", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Product.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Product.prototype, "count", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => product_price_model_1.ProductPrice),
    __metadata("design:type", product_price_model_1.ProductPrice)
], Product.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => product_image_model_1.ProductImage),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => category_model_1.Category, () => product_category_model_1.ProductCategory),
    __metadata("design:type", Array)
], Product.prototype, "categories", void 0);
exports.Product = Product = __decorate([
    sequelize_typescript_1.Table
], Product);
