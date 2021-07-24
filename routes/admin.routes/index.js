const router = require("express").Router();

const adminTagsRoutes = require("./tags.router");

router.use("/tags", adminTagsRoutes)

module.exports = router;
