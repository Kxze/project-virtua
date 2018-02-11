import { Express } from "express";
import { User } from "../models/User";

import * as passport from "passport";
import { Strategy } from "passport-twitter";

export default (app: Express, config: any) => {
    passport.use(new Strategy({
        consumerKey: config.twitter.consumerKey,
        consumerSecret: config.twitter.consumerSecret,
        callbackURL: config.twitter.callbackURL,
    }, async (token, tokenSecret, profile, callback) => {
        try {
            const user = await User.findOrCreate({ where: { twitterId: profile.id }});
            return callback(null, user[0]);
        } catch (err) {
            return callback(err, null);
        }
    }));

    app.get("/auth/twitter", passport.authenticate("twitter"));

    app.get("/auth/twitter/callback", passport.authenticate("twitter"), (req, res) => {
        console.log(req.user);
        res.json(req.user);
    });
};
