const express = require("express");
const multer = require("multer");
const Imagencontroler = require("../controllers/imagenes");
const router = express.Router();
const upload = multer({ dest: 'uploads/' });


router.post('/registrar-imagen',upload.single('Image'), Imagencontroler.uploadSingle);

router.get("/files/:filename", Imagencontroler.Mostrar1imagen)
module.exports = router;
