const express = require("express");
const Usercontroler = require("../controllers/user");
const md_auth = require("../middleware/authentication");

const router = express.Router();

router.post("/register", Usercontroler.register);
router.post( "/login" ,Usercontroler.login);
router.post("/getdata" , Usercontroler.getDatalog);

router.get("/protected", [md_auth.ensureAuth], Usercontroler.protected);


module.exports = router;