export const config = {
    port: process.env.PV_PORT || 4000,
    secret: process.env.PV_SECRET || "vaipassarmal",
    mysql: {
        database: process.env.PV_DB || "virtua",
        username: process.env.PV_DB_USERNAME || "root",
        password: process.env.PV_DB_PASSWORD || "Emiolo123*",
    },
};
