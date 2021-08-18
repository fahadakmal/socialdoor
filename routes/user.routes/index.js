const router = require("express").Router();

const user = require("./user.router");
const event=require("./event.router");

router.use("/", user);
router.use('/events',event);



module.exports = router;
