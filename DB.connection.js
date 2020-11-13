const mongoose = require("mongoose");

module.exports = (DB) => {
  mongoose
    .connect(
      `mongodb://${DB.username}:${DB.password}@${DB.DB_name}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));
};
