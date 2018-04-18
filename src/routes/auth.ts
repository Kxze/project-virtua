import { RouteParams } from "../types";
import { Response } from "express";
import { User } from "../entity/User";
import * as passport from "passport";
import * as Twitter from "passport-twitter";
import * as JWT from "passport-jwt";
import { createToken } from "../utils";

export default ({ app, db, config }: RouteParams) => {

    passport.use(new Twitter.Strategy(config.services.twitter, async (token, tokenSecret, profile, callback) => {
        try {
            const user = await User.findOne({ twitterId: profile.id }); 
            if (user) {
                callback(null, user);
            } else {
                const newUser = new User();
                user.twitterId = profile.id;
                await newUser.save();
                callback(null, user);
            }
        } catch (err) {
            callback(err.message, null);
        } 
    }));

    passport.use(new JWT.Strategy({
        ...config.services.jwt,
        secretOrKey: config.secret.encryptionToken,
        jwtFromRequest: JWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    }, async (jwt_payload, callback) => {
        try {
            const user = await User.findOneById(jwt_payload.id);
            if (!user) { return callback(null, false) }
            return callback(null, user);
        } catch (err) {
            return callback(err.message, null);
        }
    }));

    passport.serializeUser((user: User, callback) => {
        callback(null, user.id);
    });

    passport.deserializeUser(async (id, callback) => {
        try {
            const user = await User.findOneById(id);
            callback(null, user);
        } catch (err) {
            callback(err.message, null);
        }   
    });


    app.get("/api/auth/twitter", passport.authenticate("twitter", { session: false }));
    app.get("/api/auth/twitter/callback", passport.authenticate("twitter", { session: false }), async (req: any, res: any) => {
        const user = await User.findOneById(req.user.id);

        const options = {
            expiresIn: "30 days",
            issuer: "virtua"
        };
        const token = await createToken(user, config.secret.encryptionToken, options);

        return res.json({ token });
    });
}
