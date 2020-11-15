const mongoose = require("mongoose");

module.exports = (DB) => {
  mongoose
    .connect(
      `mongodb+srv://fahad:fahad7700546@cluster0.k2nto.mongodb.net/sc?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));
};
