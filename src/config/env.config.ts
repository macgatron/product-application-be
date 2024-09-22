import dotenv from "dotenv";
dotenv.config();

interface IConfig {
    app: {
        host: string,
        port: number,
    },
    database: {
        driver: string,
        host: string,
        db: string,
        username: string,
        password: string,
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
    database: {
        driver: process.env.DB_DRIVER || 'mysql',
        host: process.env.DB_HOST || '127.0.0.1',
        db: process.env.DB_DATABASE || 'test_db',
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
    },
    panelo: {
        host: process.env.PANELO_HOST || 'https://portal.panelo.co/paneloresto',
    }
}

export default config;
