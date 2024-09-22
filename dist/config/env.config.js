"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    app: {
        host: process.env.HOST || '127.0.0.1',
        port: Number(process.env.PORT || 3000),
    },
    panelo: {
        host: process.env.PANELO_HOST || 'https://portal.panelo.co/paneloresto',
    }
};
exports.default = config;
