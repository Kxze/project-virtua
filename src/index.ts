import "reflect-metadata";
import * as express from "express";
import { createConnection } from "typeorm";
import * as bodyParser from "body-parser";
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

    // Routes
    loadRoutes({ config, db, app });

    app.listen(config.port, () => {
        console.log(`Listening on port ${config.port}...`);
    });
}

main().catch(error => console.error(error));

//}).then(async connection => {
//    console.log("Loading users from the database...");
//    const users = await connection.manager.find(User, { relations: ["listens"] });
//    console.log("Loaded users: ", users);
//
//    const song = new Song();
//    song.name = "Weaker Girl";
//    await connection.manager.save(song);
//
//    const singleUser = users[0];
//    singleUser.listens = [...singleUser.listens, song];
//    await connection.manager.save(singleUser);
//
//    const allUsers = await connection.manager.find(User, { relations: ["listens"] });
//    console.log(allUsers[0].listens); 
//
//    console.log("Here you can setup and run express/koa/any other framework.");
//    
//}).catch(error => console.log(error));
