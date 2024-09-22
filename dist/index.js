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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const webController = __importStar(require("./controllers/web.controller"));
const apiController = __importStar(require("./controllers/api.controller"));
const sequalize_config_1 = __importDefault(require("./config/sequalize.config"));
const env_config_1 = __importDefault(require("./config/env.config"));
const cors = require('cors');
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = env_config_1.default.app.port || 3000;
app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', webController.Home);
app.get('/api/synchronize', apiController.Synchronize);
app.get('/api/products', apiController.GetPaginatedProducts);
app.get('/api/categories', apiController.GetCategories);
app.post('/api/export-xml', apiController.ExportXML);
app.post('/api/export-csv', apiController.ExportCSV);
app.post('/api/products', apiController.Create);
app.get('/api/products/:id', apiController.GetById);
app.put('/api/products/:id', apiController.Update);
app.delete('/api/products/:id', apiController.Delete);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`[server]: Server is running at http://localhost:${port}`);
    try {
        yield sequalize_config_1.default.sync({ force: false });
        console.log('Database synced successfully.');
    }
    catch (error) {
        console.error('Error syncing database:', error);
    }
}));
