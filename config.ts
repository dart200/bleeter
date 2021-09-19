export const ENV = process.env.NODE_ENV || "development";

export const PORT = 8080;
export const SERVER_URL = `http://localhost:${PORT}/`

export const DB_STRING = ENV === 'production'
    ? 'mongodb://localhost:27017/bleeter-prod'
    : 'mongodb://localhost:27017/bleeter'

export const JWT_KEY = 'fake_token';
