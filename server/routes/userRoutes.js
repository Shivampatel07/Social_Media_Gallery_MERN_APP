const router = require("express").Router();
const { getUserData } = require("./../controllers/userControllers");
const path = require("path");

router.get("/getuser/:username", getUserData);

module.exports = router;
