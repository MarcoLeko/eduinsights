const CONFIG_PRODUCTION = {
    PATH_TO_STATIC_FILES: 'web/build',
    SECURE_COOKIE: true,
    PORT: process.env.PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    SESSION_SECRET: process.env.SESSION_SECRET,
    SEND_GRID_API_KEY: process.env.SEND_GRID_API_KEY
};

const CONFIG_DEVELOPMENT = {
    PATH_TO_STATIC_FILES: 'web/build',
    SECURE_COOKIE: true,
    PORT: process.env.PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    SESSION_SECRET: process.env.SESSION_SECRET,
    SEND_GRID_API_KEY: process.env.SEND_GRID_API_KEY
};

const CONFIG_LOCAL = Object.assign({}, CONFIG_DEVELOPMENT, {
    PATH_TO_STATIC_FILES: '../web/build',
    SECURE_COOKIE: false
});

export {CONFIG_PRODUCTION, CONFIG_DEVELOPMENT, CONFIG_LOCAL};
