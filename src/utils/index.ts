import * as fs from "fs";
import * as path from "path";
import { Config, RouteParams } from "../types";
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";

export const loadConfig = (): Config => {
    const configFilePath = path.join(__dirname, "../../config.json");
    const configFileString = fs.readFileSync(configFilePath, "utf8");
    const configFileData: Config = JSON.parse(configFileString);

    return configFileData;
}

export const loadRoutes = (routeParams: RouteParams): void => {
    const routesPath = path.join(__dirname, "../routes");
    const files = fs.readdirSync(routesPath);

    files
        .filter((file: string) => file.endsWith(".js"))
        .forEach((file: string) => {
        const filePath = path.join(routesPath, file);
        console.log(`Loading route ${file}...`);
        require(filePath).default(routeParams);
        console.log(`\rLoading route ${file}... \x1b[42mOK\x1b[0m`)
    });
}

export const createToken = (user: User, secretKey: jwt.Secret, options: jwt.SignOptions) => {
    return new Promise((resolve, reject) => {
        const payload = { id: user.id };
        const token = jwt.sign(payload, secretKey, options, (err, token) => {
            if (err) { reject(err); }

            resolve(token);
        });
    }) 
};

