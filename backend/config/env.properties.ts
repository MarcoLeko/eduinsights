const CONFIG_PRODUCTION = {
    env: process.env.NODE_ENV,
    PATH_TO_STATIC_FILES: 'web/build',
    SECURE_COOKIE: false, // TODO: secure the cookie in eb for https
    PORT: process.env.PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    SESSION_SECRET: process.env.SESSION_SECRET,
    SEND_GRID_API_KEY: process.env.SEND_GRID_API_KEY
};

const CONFIG_DEVELOPMENT = {
    env: process.env.NODE_ENV,
    PATH_TO_STATIC_FILES: 'web/build',
    SECURE_COOKIE: false,
    PORT: process.env.PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    SESSION_SECRET: process.env.SESSION_SECRET,
    SEND_GRID_API_KEY: process.env.SEND_GRID_API_KEY
};

const CONFIG_LOCAL = Object.assign(CONFIG_DEVELOPMENT, {
    env: process.env.NODE_ENV,
    PATH_TO_STATIC_FILES: '../web/build'
});

export {CONFIG_PRODUCTION, CONFIG_DEVELOPMENT, CONFIG_LOCAL};
