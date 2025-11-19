require("dotenv").config();

module.exports = {
    dbConfig: {
        connection: {
            user: process.env.USERDB,
            pass: process.env.ROOT_PASSWORD,
            dbname: process.env.DATABASE
        },
        configOptions: {
            host: process.env.HOST,
            port: process.env.DB_PORT,
            dialect: process.env.DIALECT || 'mysql',
            logging: true
        }
    },
}