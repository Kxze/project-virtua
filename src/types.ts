import { ConnectionOptions, Connection } from "typeorm";

export interface TwitterService {
    consumerKey: string;
    consumerSecret: string;
    callbackURL: string;
}

export interface JWTService {
    issuer: string;
}

export interface Services {
    twitter: TwitterService;
    jwt: JWTService;
}

export interface SecretOptions {
    encryptionToken: string;
}

export interface Config {
    database: ConnectionOptions;
    port: number;
    services: Services;
    secret: SecretOptions;
}

export interface RouteParams {
    app: any;
    db: Connection; 
    config: Config;
}

