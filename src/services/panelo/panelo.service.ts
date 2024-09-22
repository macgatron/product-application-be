import axios from "axios";
import config from "../../config/env.config";
import paneloConfig from "../../config/panelo.config";
import { PaneloResponseDto } from "./dto/panelo-product.dto";

const GetProducts = async (): Promise<PaneloResponseDto[]> => {
    const { data } = await axios.get(`${config.panelo.host}${paneloConfig.url.products}`);
    return data?.products as PaneloResponseDto[];
}

export { GetProducts }
