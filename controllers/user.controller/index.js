const user_controller = require("./user.controller");
const tags_controller = require("./tags.controller");
const event_controller = require("./event.controller");


module.exports = {
  user_controller: user_controller,
  tags_controller: tags_controller,
  user_event_controller:event_controller
};
