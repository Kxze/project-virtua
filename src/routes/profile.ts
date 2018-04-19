import { RouteParams } from "../types";
import { User, Profile } from "../entity";
import * as passport from "passport";

export default ({ app, db, config }: RouteParams) => {

    app.get("/api/profile/:user?", passport.authenticate("jwt", { session: false }), async (req: any, res: any) => {
        const userId = req.params.user || req.user.id;
        const user = await User.findOneById(userId, { relations: ["profile"] });

        return res.send(user);
    });

    app.put("/api/profile", passport.authenticate("jwt", { session: false }), async (req: any, res: any) => {
        const user = await User.findOneById(req.user.id, { relations: ["profile"] });
        const { name, location, username, description } = req.body;

        if (!user.profile) {
            const profile = new Profile();
            profile.name = name;
            profile.location = location;
            profile.username = username;
            profile.description = description;
            profile.username = username;

            await user.updateProfile(profile);
        } else {
            user.profile = req.body;
            await user.save();
        }
        
        return res.send();
    });

}
