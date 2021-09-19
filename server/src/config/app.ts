export const PORT = 8080;
export const environment = {
    development: {
        serverURL: `http://localhost:${PORT}/`,
        dbString: 'mongodb://localhost:27017/bleeter'
    },
    production: {
        serverURL: `http://localhost:${PORT}/`,
        dbString: 'mongodb://localhost:27017/bleeter-prod'
    }
}
export const JWT_KEY = 'fake_token';
