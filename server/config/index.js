require("dotenv").config();

const config = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  TOKEN_EXPIRESIN: process.env.TOKEN_EXPIRESIN
};

module.exports = config;
