import dotenv from "dotenv";
dotenv.config();

export interface IPaneloConfig {
    url: {
        products: string,
    }
}

const paneloConfig: IPaneloConfig = {
    url: {
        products: process.env.PANELO_URL_PRODUCT || '/api/productlist/18',
    }
}

export default paneloConfig;
