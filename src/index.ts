import express, { Express } from "express";
import dotenv from "dotenv";
import * as webController from "./controllers/web.controller";
import * as apiController from "./controllers/api.controller";
import sequelize from "./config/sequalize.config";
import config from "./config/env.config";

const cors = require('cors')

dotenv.config();

const app: Express = express();
const port = config.app.port || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.listen(port, async () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
    try {
        await sequelize.sync({ force: false });
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
});
