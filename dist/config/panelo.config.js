"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const paneloConfig = {
    url: {
        products: process.env.PANELO_URL_PRODUCT || '/api/productlist/18',
    }
};
exports.default = paneloConfig;
