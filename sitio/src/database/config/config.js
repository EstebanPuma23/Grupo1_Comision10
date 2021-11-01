require('dotenv').config();

module.exports = {
  "development": {
    "username": procces.env.DB_USERNAME,
    "password": procces.env.DB_PASSWORD,
    "database": procces.env.DATABASE,
    "host": procces.env.DB_HOST,
    "dialect": "mysql",
    "port": procces.env.DB_PORT
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
