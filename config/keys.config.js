const fs = require("fs");
module.exports = {
  PORT: process.env.PORT || 5000,
  FILE_UPLOAD_LINK:"socialdoor.lovestoblog.com" || "",
  DB: {
    DB1: {
      username: process.env.DB_USER || "",
      password: process.env.DB_PASSWORD || "",
      DB_name: process.env.DB_NAME || "",
    },
  },
  jwt: {
    secret:
    process.env.JWT_SECRET_KEY || "8x978w&*(@&#(@(#____SDKHGFYGDBXHAG*^@^@@_!_++!+@(*(=01==`0asdfnaicyiuayb(*^*7nsac982h)=0-39",
  },
  mail: {
    default: {
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "frana7738@gmail.com",
        pass: "pdbposcdrrnhoqao",
      },
    },
    gmail: {},
  },
};
