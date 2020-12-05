const CONFIG_PRODUCTION = {
    env: process.env.NODE_ENV,
    PATH_TO_STATIC_FILES: 'web/build',
    PORT: process.env.PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
};

const CONFIG_LOCAL = Object.assign({}, CONFIG_PRODUCTION, {
    env: process.env.NODE_ENV,
    PATH_TO_STATIC_FILES: '../web/build'
});

export {CONFIG_PRODUCTION, CONFIG_LOCAL};
