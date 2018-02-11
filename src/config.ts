export const config = {
    port: process.env.PV_PORT || 4000,
    secret: process.env.PV_SECRET || "vaipassarmal",
    apiUrl: process.env.PV_API_URL || "http://127.0.0.1:" + (process.env.PV_PORT || 4000),
    mysql: {
        database: process.env.PV_DB || "virtua",
        username: process.env.PV_DB_USERNAME || "root",
        password: process.env.PV_DB_PASSWORD || "Emiolo123*",
    },
    twitter: {
        consumerKey: process.env.PV_TWITTER_KEY || "M15XK9ajgckl1Jhb7JotmS0lb",
        consumerSecret: process.env.PV_TWITTER_SECRET || "nlvGsFmeMXcLF5NoOPylNVTv8lsTFdWjLJPMuSqss1tAbiN9hr",
        callbackURL: process.env.PV_TWITTER_CALLBACK || "http://127.0.0.1:" + (process.env.PV_PORT || 4000) + "/auth/twitter/callback",
    },
};
