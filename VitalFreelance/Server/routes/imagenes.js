const express = require("express");
const multer = require("multer");
const Imagencontroler = require("../controllers/imagenes");
const router = express.Router();
const path = require('path');





const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    console.log(file);
    // Mantener la extensión original del archivo
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});
 


const upload = multer({ storage: storage });

router.post('/registrar-imagenes', upload.any('Image'), Imagencontroler.uploadMultiple); // 'images' es el nombre del campo en el formulario y 10 es el número máximo de archivos
router.post('/registrar-imagen',upload.single('Image'), Imagencontroler.uploadSingle);
router.get("/ofertas-con-imagenes", Imagencontroler.mostrarTodasOfertasConImagenes);
router.get("/ofertas-con-imagenes-email", Imagencontroler.mostrarOfertasPorEmail);
router.get('/:id', Imagencontroler.mostrarDetalleOfertaLocal);
module.exports = router;
