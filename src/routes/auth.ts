import { Express } from "express";
import { User } from "../models/User";

import * as passport from "passport";
import * as TwitterStrategy from "passport-twitter";

export default (app: Express, config: any) => {
    app.get("/", async (req, res) => {
        await User.create({
            username: "Teste",
            email: "rodrigoc40@live.com",
            twitterId: "123123",
        });

        res.send("Hello!");
    });
};
