import * as passport from "passport";
import { RouteParams } from "../types";
import { Song } from "../entity/index";
import { User } from "../entity/User";

export default ({ app, db, config }: RouteParams) => {

    app.post("/test", async (req: any, res: any) => {
        const newSong = new Song();
        newSong.name = "Heard a Song";
        await newSong.save();

        res.send();
    });

    app.post("/api/listen", passport.authenticate("jwt", { session: false }), async (req: any, res: any) => {

        const newSong = await Song.findOneById(1);
        const user = await User.findOneById(req.user.id);
        user.addListen(newSong);

        return res.send();
    });

    app.get("/api/listen", passport.authenticate("jwt", { session: false }), async (req: any, res: any) => {

        const user = await User.findOneById(req.user.id, { relations: ["profile", "listens", "listens.song"] });
        return res.json(user);

    })

};
