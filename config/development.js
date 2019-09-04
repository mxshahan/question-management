require('dotenv').config();
module.exports = {
  server: {
    port: 3005
  },
  db: {
    host: 'localhost',
    dbname: 'sophy-admin',
    debug: false,
    options: {
      username: '',
      password: '',
      port: 27017
    }
  },
  secret: process.env.SECRET_KEY,
};