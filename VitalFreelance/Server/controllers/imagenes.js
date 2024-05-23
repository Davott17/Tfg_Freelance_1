const Oferta = require ("../models/ofertas")
const FileSchema = require("../models/gridFS")
const gfs = require("../index");
const { response } = require("../app");

// Assuming required modules and schemas (FileSchema, Oferta) are already imported

async function uploadSingle(req, res) {
  const { title, description, zona_trabajo, ocupacion, email } = req.body;

  console.log(req.body);
  console.log(req.file);

  try {
      const nuevaImage = new FileSchema(req.file);

      await nuevaImage.save();

      const nuevaOferta = new Oferta({
          title,
          description,
          Image: nuevaImage._id, // Save reference to the image file
          zona_trabajo,
          ocupacion,
          email,
      });

      await nuevaOferta.save();

      res.json({ file: req.file, message: 'File uploaded successfully' });
  } catch (error) {
      res.status(500).json({ error: "Internal server error" });
  }
}



// async function Mostrar1imagen(req, res) {
//   try {
//     const file = await gfs.files.findOne({ filename: req.params.filename });

//     if (!file || file.length === 0) {
//       return res.status(404).json({ err: 'No file exists' });
//     }

//     // Verificar si el archivo es una imagen
//     if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
//       const readstream = gfs.createReadStream(file.filename);
//       res.set('Content-Type', file.contentType);
//       readstream.pipe(res);
//     } else {
//       res.status(404).json({ err: 'Not an image' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// }


// // Assuming required modules and schemas (FileSchema, Oferta) are already imported

// async function mostrarOfertaConImagen(req, res) {
//   try {
//     const ofertaId = req.params.id;

//     // Buscar la oferta por ID
//     const oferta = await Oferta.findById(ofertaId).populate('Image');
      
//     if (!oferta) {
//       return res.status(404).json({ error: 'Oferta no encontrada' });
//     }

//     // Obtener la imagen asociada
//     const imageFile = await gfs.files.findOne({ _id: oferta.Image });

//     if (!imageFile || imageFile.length === 0) {
//       return res.status(404).json({ error: 'Imagen no encontrada' });
//     }

//     // Verificar si el archivo es una imagen
//     if (imageFile.contentType === 'image/jpeg' || imageFile.contentType === 'image/png') {
//       const readstream = gfs.createReadStream(imageFile.filename);
//       res.set('Content-Type', imageFile.contentType);

//       // Enviar la oferta y la imagen
//       res.json({
//         oferta,
//         imageStream: readstream,
//       });
//     } else {
//       res.status(404).json({ error: 'El archivo asociado no es una imagen' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// }

async function mostrarTodasOfertasConImagenes(req, res) {
  try {
    const ofertas = await Oferta.find().populate('Image');
    console.log('Ofertas encontradas:', ofertas);
   
    if (!ofertas || ofertas.length === 0) {
      return res.status(404).json({ error: 'No se encontraron ofertas' });
    }
   

    const ofertasConImagenes = await Promise.all(ofertas.map(async (oferta) => {
      try {
        const imageFile = await FileSchema.findOne({ _id: oferta.Image });
        console.log('Imagen encontrada:', imageFile);

        if (imageFile && (imageFile.mimetype === 'image/jpeg' ||imageFile.mimetype === 'image/jpg' || imageFile.mimetype === 'image/png')) {
          const fs = require('fs');
          const imageData = fs.readFileSync(imageFile.path);
          const base64Image = Buffer.from(imageData).toString('base64');
          const imageUrl = `data:${imageFile.mimetype};base64,${base64Image}`;
          return { ...oferta._doc, imageUrl };
        } else {
          return { ...oferta._doc, imageUrl: null };
        }
      } catch (imageError) {
        console.error('Error al buscar la imagen:', imageError);
        return { ...oferta._doc, imageUrl: null };
      }
    }));

    res.json(ofertasConImagenes);
  } catch (error) {
    console.error('Error interno del servidor:', error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}




module.exports = {
    // Mostrar1imagen,
    uploadSingle,
    // mostrarOfertaConImagen,
    mostrarTodasOfertasConImagenes,

};