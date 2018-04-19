import "reflect-metadata";
import * as express from "express";
import { createConnection } from "typeorm";
import * as bodyParser from "body-parser";
import * as session from "express-session";
import { loadConfig, loadRoutes } from "./utils";

const main = async () => {
    const config = loadConfig();
    const db = await createConnection({
        ...config.database,
        synchronize: true,
        logging: true,
        entities: [
            __dirname + "/entity/*.js"
        ]
    });
    const app = express();
    
    // Middlewares
    app.use(bodyParser.json());
    app.use(session({ secret: config.secret.encryptionToken, cookie: { secure: false } }))

    // Routes
    loadRoutes({ config, db, app });

    app.listen(config.port, () => {
        console.log(`Listening on port ${config.port}...`);
    });
}

main().catch(error => console.error(error));

