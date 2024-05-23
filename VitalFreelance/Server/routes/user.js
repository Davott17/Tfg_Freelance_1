const express = require("express");
const usercontroler = require("../controllers/user");
const md_auth = require("../middleware/authentication");
const router = express.Router();


router.post("/register", usercontroler.register);
router.post( "/login" ,usercontroler.login);
// router.get("/getDatalog/:id" , usercontroler.getDatalog);
router.get("/getDatalog" , usercontroler.getDatalog);

// router.get("/protected", [md_auth.ensureAuth], usercontroler.protected);


module.exports = router;
