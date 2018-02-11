import * as express from "express";
import { fs } from "mz";
import { config } from "./config";
import * as path from "path";

import * as bodyParser from "body-parser";
import * as session from "express-session";
import { Sequelize } from "sequelize-typescript";

export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: config.secret, resave: false, saveUninitialized: false }));

// Loads database
const sequelize = new Sequelize({
    ...config.mysql,
    dialect: "mysql",
    modelPaths: [__dirname + "/models"],
});

// Loads middlewares
console.log("Loading middlewares...");
const middlewaresPath = path.join(__dirname + "/middlewares");
fs.readdirSync(middlewaresPath, "utf8")
    .filter(file => file.endsWith(".js"))
    .forEach(fileName => {
        const filePath = path.join(middlewaresPath, fileName);
        app.use((require(filePath)).default);
        console.log("Loaded middleware " + fileName);
    });

// Loads routes
const routesPath = path.join(__dirname + "/routes");
fs.readdirSync(routesPath, "utf8")
    .filter(file => file.endsWith(".js"))
    .forEach(fileName => {
        const filePath = path.join(routesPath, fileName);
        (require(filePath)).default(app, config, sequelize);
        console.log("Loaded route " + fileName);
    });

sequelize.sync()
    .then(() => {
        app.listen(config.port, () => {
            console.log(`Listening on port ${config.port}`);
        });
    });
