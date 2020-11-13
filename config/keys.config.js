const fs = require("fs");
module.exports = {
  PORT: process.env.PORT || 5000,

  DB: {
    DB1: {
      username: process.env.DB_USER || "",
      password: process.env.DB_PASSWORD || "",
      DB_name: process.env.DB_NAME || "",
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY || "",
  },
  mail: {
    default: {
      host: "",
      port: 587,
      secure: false,
      auth: {
        user: "",
        pass: "",
      },
    },
    gmail: {},
  },
};
