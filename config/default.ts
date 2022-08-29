require('dotenv').config();

export default {
    port: process.env.port,
    host: process.env.host,
    dbURI: process.env.dbURI,
    password_salt: process.env.password_salt,
    admin_login_password: process.env.admin_login_password,
    jwt_secret: process.env.jwt_secret,
    jwt_expires_in: process.env.jwt_expires_in,
};
