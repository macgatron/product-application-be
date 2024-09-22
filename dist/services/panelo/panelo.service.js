"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProducts = void 0;
const axios_1 = __importDefault(require("axios"));
const env_config_1 = __importDefault(require("../../config/env.config"));
const panelo_config_1 = __importDefault(require("../../config/panelo.config"));
const GetProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`${env_config_1.default.panelo.host}${panelo_config_1.default.url.products}`);
    return data === null || data === void 0 ? void 0 : data.products;
});
exports.GetProducts = GetProducts;
