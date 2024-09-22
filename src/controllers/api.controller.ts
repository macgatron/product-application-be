import { Request, Response } from "express";
import { ResponseSuccess } from "../utils/response.util";
import * as ProductService from "../services/product.service";
import {ProductCreateDto} from "../dto/product-create.dto";

const Synchronize = async (req: Request, res: Response) => {
    const sync = await ProductService.Synchronize()
    return ResponseSuccess(res, { sync });
}

const GetPaginatedProducts = async (req: Request, res: Response) => {
    const response = await ProductService.GetPaginatedProducts({
        page: req.query?.page as any,
        limit: req.query?.limit as any,
        category: req.query?.category as any,
    });
    return ResponseSuccess(res, response);
}

const GetCategories = async (req: Request, res: Response) => {
    const response = await ProductService.GetCategories();
    return ResponseSuccess(res, response);
}

const ExportXML = async (req: Request, res: Response) => {
    const xml = await ProductService.ExportXML();
    res.header('Content-Type', 'application/xml');
    return res.send(xml);
}

const ExportCSV = async (req: Request, res: Response) => {
    const csv = await ProductService.ExportCSV();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="products.csv"');
    return res.send(csv);
}

const Create = async (req: Request, res: Response) => {
    const product = await ProductService.Create(req.body as ProductCreateDto);
    return ResponseSuccess(res, product);
}

const GetById = async (req: Request, res: Response) => {
    const productId = req.params.id;
    const product = await ProductService.GetById(Number(productId));
    return ResponseSuccess(res, product);
}

const Update = async (req: Request, res: Response) => {
    const productId = req.params.id;
    const product = await ProductService.Update(Number(productId), req.body);
    return ResponseSuccess(res, 'Update');
}

const Delete = async (req: Request, res: Response) => {
    await ProductService.Delete(Number(req.params.id));
    return ResponseSuccess(res, true);
}

export { Synchronize, GetPaginatedProducts, GetCategories, ExportXML, ExportCSV, Create, Update, Delete, GetById }