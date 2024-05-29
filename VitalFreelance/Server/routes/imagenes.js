const express = require("express");
const multer = require("multer");
const Imagencontroler = require("../controllers/imagenes");
const router = express.Router();
const path = require('path');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    // Mantener la extensión original del archivo
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

const upload = multer({ storage: storage });
const multipleupload = multer({ storage: storage }).array('Image', 10);

router.post('/registrar-imagenes', multipleupload, Imagencontroler.uploadMultiple); // 'images' es el nombre del campo en el formulario y 10 es el número máximo de archivos
router.post('/registrar-imagen',upload.single('Image'), Imagencontroler.uploadSingle);
router.post('/buscar',upload.single('Image'), Imagencontroler.buscar);

// router.get("/files/:filename", Imagencontroler.Mostrar1imagen)
router.get("/ofertas-con-imagenes", Imagencontroler.mostrarTodasOfertasConImagenes);
module.exports = router;
