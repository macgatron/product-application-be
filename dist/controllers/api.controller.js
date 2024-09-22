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
exports.GetById = exports.Delete = exports.Update = exports.Create = exports.ExportCSV = exports.ExportXML = exports.GetCategories = exports.GetPaginatedProducts = exports.Synchronize = void 0;
const response_util_1 = require("../utils/response.util");
const ProductService = __importStar(require("../services/product.service"));
const Synchronize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sync = yield ProductService.Synchronize();
    return (0, response_util_1.ResponseSuccess)(res, { sync });
});
exports.Synchronize = Synchronize;
const GetPaginatedProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const response = yield ProductService.GetPaginatedProducts({
        page: (_a = req.query) === null || _a === void 0 ? void 0 : _a.page,
        limit: (_b = req.query) === null || _b === void 0 ? void 0 : _b.limit,
        category: (_c = req.query) === null || _c === void 0 ? void 0 : _c.category,
    });
    return (0, response_util_1.ResponseSuccess)(res, response);
});
exports.GetPaginatedProducts = GetPaginatedProducts;
const GetCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield ProductService.GetCategories();
    return (0, response_util_1.ResponseSuccess)(res, response);
});
exports.GetCategories = GetCategories;
const ExportXML = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const xml = yield ProductService.ExportXML();
    res.header('Content-Type', 'application/xml');
    return res.send(xml);
});
exports.ExportXML = ExportXML;
const ExportCSV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const csv = yield ProductService.ExportCSV();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="products.csv"');
    return res.send(csv);
});
exports.ExportCSV = ExportCSV;
const Create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield ProductService.Create(req.body);
    return (0, response_util_1.ResponseSuccess)(res, product);
});
exports.Create = Create;
const GetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const product = yield ProductService.GetById(Number(productId));
    return (0, response_util_1.ResponseSuccess)(res, product);
});
exports.GetById = GetById;
const Update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const product = yield ProductService.Update(Number(productId), req.body);
    return (0, response_util_1.ResponseSuccess)(res, 'Update');
});
exports.Update = Update;
const Delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield ProductService.Delete(Number(req.params.id));
    return (0, response_util_1.ResponseSuccess)(res, true);
});
exports.Delete = Delete;
