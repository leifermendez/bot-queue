const SESSION_FILE_PATH = process.env.SESSION_FILE_PATH || './session.json';

const REDIS_CONFIG = {
    removeOnSuccess: true,
    redis: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        password: process.env.DB_PASS,
    },
}

module.exports = {
    SESSION_FILE_PATH,
    REDIS_CONFIG
}