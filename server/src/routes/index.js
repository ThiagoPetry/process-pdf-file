const express = require("express");
const router = express.Router();

const filesRoutes = require("./files.routes");

router.use("/api/files", filesRoutes);

module.exports = router;
