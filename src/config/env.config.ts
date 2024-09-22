import dotenv from "dotenv";
dotenv.config();

interface IConfig {
    app: {
        host: string,
        port: number,
    },
    panelo: {
        host: string,
    }
}

const config: IConfig = {
    app: {
        host: process.env.HOST || '127.0.0.1',
        port: Number(process.env.PORT || 3000),
    },
    panelo: {
        host: process.env.PANELO_HOST || 'https://portal.panelo.co/paneloresto',
    }
}

export default config;
