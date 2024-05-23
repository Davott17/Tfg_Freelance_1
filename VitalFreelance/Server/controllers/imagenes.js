const Oferta = require ("../models/ofertas")

async function uploadSingle(req, res) {
    const { title, description,  zona_trabajo, ocupacion, email } = req.body;
    try {
        const nuevaOferta = new Oferta({
            title,
            description,
            Image: req.file.filename,
            zona_trabajo,
            ocupacion,
            email,
        });
        await nuevaOferta.save();
        console.log(nuevaOferta);
        res.json({ file: req.file, message: 'File uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}


async function Mostrar1imagen(req, res) {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ err: 'No file exists' });
    }

    // Verificar si el archivo es una imagen
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      const readstream = gfs.createReadStream(file.filename);
      res.set('Content-Type', file.contentType);
      readstream.pipe(res);
    } else {
      res.status(404).json({ err: 'Not an image' });
    }
  });
}


module.exports = {
    Mostrar1imagen,
    uploadSingle,

};