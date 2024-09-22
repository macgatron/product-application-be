import * as PaneloService from "./panelo/panelo.service";
import { Category } from "../models/category.model";
import { Product } from "../models/product.model";
import { ProductPrice } from "../models/product-price.model";
import { ProductImage } from "../models/product-image.model";
import { ProductCategory } from "../models/product-category.model";
import {ProductCreateDto} from "../dto/product-create.dto";

const { json2xml } = require('xml-js');

const Synchronize = async () => {
    const categories = await PaneloService.GetProducts();
    for (const category of categories) {
        /**
         * Sync categories
         */
        let dbCategory = await Category.findOne({ where: { id: category.id } });
        if (!dbCategory) {
            dbCategory = await Category.create({ id: category.id, name: category.name });
        } else {
            if (dbCategory.name !== category.name) {
                await Category.update({ name: category.name }, { where: { id: category.id } });
            }
        }

        /**
         * Sync products
         */
        for (const product of category.products) {
            let dbProduct = await Product.findOne({ where: { id: product.id }, include: [ProductPrice, ProductImage] });
            if (!dbProduct) {
                dbProduct = await Product.create({ ...product, userId: product.auth_id, stock: product.stock?.stock ?? 0, } as any);
            } else {
                if (dbProduct.isInValidData(product)) {
                    await Product.update({
                        title: product.title,
                        slug: product.slug,
                        lang: product.lang,
                        status: product.status,
                        count: product.count,
                        stock: product.stock?.stock ?? 0,
                    }, { where: { id: product.id } });
                }
            }
            /**
             * Product categories
             */
            await ProductCategory.destroy({ where: { productId: dbProduct.id, categoryId: dbCategory.id } });
            await ProductCategory.create({ productId: dbProduct.id, categoryId: dbCategory.id });
            /**
             * Product Price
             */
            if (!dbProduct.price) {
                await ProductPrice.create({ productId: dbProduct.id, price: product.price?.price ?? 0 });
            } else {
                if (dbProduct.price.price !== product.price.price) {
                    await ProductPrice.update({ price: product.price.price }, { where: { id: product.price.id } });
                }
            }
            /**
             * Product Images
             */
            if (product.preview) {
                await ProductImage.destroy({ where: { productId: product.id } });
                await ProductImage.create({ productId: product.id, type: product.type, content: product.preview.content });
            }
        }
    }
    return true;
}

const GetPaginatedProducts = async (options: { page?: number; limit?: number; category?: string }) => {
    const { page = 1, limit = 10, category } = options;

    const offset = (Number(page) - 1) * Number(limit);

    let query;
    if (category) {
        query = { id: category }
    }

    const { rows, count } = await Product.findAndCountAll({
        limit: Number(limit),
        offset: Number(offset),
        include: [ProductImage, ProductPrice, { model: Category, where: query }],
    });
    return  {
        data: rows,
        limit,
        totalItems: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
    }
}

const GetCategories = async () => {
    return Category.findAll();
}

const ExportXML = async () => {
    const products = await Product.findAll({ include: [ProductImage, Category, ProductPrice] });
    const mappedProducts = mapProducts(products);
    return json2xml({
        products: {
            product: mappedProducts,
        },
    }, { compact: true, ignoreComment: true, spaces: 4 });
}

const ExportCSV = async () => {
    const products = await Product.findAll({ include: [ProductImage, Category, ProductPrice] });
    const mappedProducts = mapProducts(products);
    return convertToCSV(mappedProducts);
}

const Create = async (dto: ProductCreateDto) => {
    const product = await Product.create(dto as any);
    await ProductPrice.create({ productId: product.id, price: dto.price });
    const category = await Category.findOne({ where: { id: dto.category } });
    if (category) {
        await ProductCategory.create({ productId: product.id, categoryId: dto.category });
    }
    return product;
}

const Update = async (productId: number, dto: ProductCreateDto) => {
    const product = await Product.findOne({ where: { id: productId }, include: [ProductImage, Category, ProductPrice] })
    if (!product) {
        return false;
    }
    await Product.update(dto as any, { where: { id: product.id } });
    await ProductPrice.update({ price: dto.price }, { where: { productId: product.id } });
    await ProductCategory.destroy({ where: { productId: product.id } });
    const category = await Category.findOne({ where: { id: dto.category } });
    if (category) {
        await ProductCategory.create({ productId: product.id, categoryId: dto.category });
    }
    return GetById(productId);
}

const GetById = async (productId: number) => {
    return (await Product.findOne({ where: { id: productId }, include: [ProductImage, Category, ProductPrice] }) ?? undefined);
}

const Delete = async (productId: number) => {
    return await Product.destroy({ where: { id: productId } });
}

function mapProducts(products: Product[]) {
    return products.map((product) => {
        return {
            id: product.id,
            name: product.title,
            image: Array.isArray(product.images) && product.images.length > 0 ? product.images[0]?.content : '',
            stock: product.stock,
            price: product.price?.price,
        }
    })
}

const convertToCSV = (data: any) => {
    const headers = Object.keys(data[0]);
    const csvRows = data.map((row: any) => headers.map(header => row[header]).join(','));
    return [headers.join(','), ...csvRows].join('\n');
};


export { Synchronize, GetPaginatedProducts, GetCategories, ExportXML, ExportCSV, Create, Delete, GetById, Update };
