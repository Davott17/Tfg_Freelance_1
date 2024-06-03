const Oferta = require("../models/ofertas")
const locals = require("../models/locals")
const FileSchema = require("../models/gridFS")
const axios = require('axios');
const gfs = require("../index");
const { response } = require("../app");
const ofertas = require("../models/ofertas");

const GOOGLE_MAPS_API_KEY = 'AIzaSyDJCrqVEriiUOGwpzfm8S5prPH4SB_rBWo';

// Assuming required modules and schemas (FileSchema, Oferta) are already imported

async function uploadSingle(req, res) {
  const { title, description, zona_trabajo, ocupacion, email } = req.body;
  console.log(req.file)
  try {
    // Geocodificar la dirección
    const geoResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        address: zona_trabajo,
        key: GOOGLE_MAPS_API_KEY
      }
    });
    console.log(geoResponse);
    if (geoResponse.data.status !== 'OK') {
      return res.status(400).json({ error: 'Error al geocodificar la dirección' });
    }

    const location = geoResponse.data.results[0].geometry.location;
    const coordinates = {
      lat: location.lat,
      lng: location.lng
    };
    console.log(location);
    // Crear y guardar la imagen
    const nuevaImage = new FileSchema(req.file);
    await nuevaImage.save();

    // Crear y guardar la oferta con las coordenadas
    const nuevaOferta = new Oferta({
      title,
      description,
      Image: nuevaImage._id,  // Guardar referencia al archivo de imagen
      zona_trabajo: coordinates,  // Guardar las coordenadas en lugar de la dirección
      ocupacion,
      email,
    });

    await nuevaOferta.save();

    res.json({ file: req.file, message: 'File uploaded and offer saved successfully' });
  } catch (error) {
    console.error('Error interno del servidor:', error);
    res.status(500).json({ error: "Internal server error" });
  }
}







async function uploadMultiple(req, res) {
  console.log(req.files);
  try {
    // req.files contendrá los archivos subidos
    const files = req.files;
    // req.body contendrá los demás campos del formulario
    const { title, description, zona_trabajo, ocupacion, email } = req.body;

    // Aquí puedes manejar los archivos y los datos del formulario, por ejemplo, guardarlos en la base de datos

    console.log('Archivos:', files);
    console.log('Datos del formulario:', req.body);
    // Geocodificar la dirección
    const geoResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        address: zona_trabajo,
        key: GOOGLE_MAPS_API_KEY // Usa tu clave de Google Maps API
      }
    });
    console.log(geoResponse);
    if (geoResponse.data.status !== 'OK') {
      return res.status(400).json({ error: 'Error al geocodificar la dirección' });
    }
    const location = geoResponse.data.results[0].geometry.location;
    const coordinates = {
      lat: location.lat,
      lng: location.lng
    };
    console.log(location);
    // Crear y guardar las imágenes
    const imagenesGuardadas = [];
    for (const file of files) {
      let nuevaImage = new FileSchema({
        fieldname: file.fieldname,
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        destination: file.destination,
        filename: file.filename,
        path: file.path,
        size: file.size
      });
      const imagenGuardada = await nuevaImage.save();
      imagenesGuardadas.push(imagenGuardada);
    }
    console.log(imagenesGuardadas);
    // Crear y guardar la oferta con las coordenadas y las referencias a las imágenes
    const nuevoLocal = new locals({
      title,
      description,
      Image: imagenesGuardadas, // Array de IDs de las imágenes guardadas
      zona_trabajo: coordinates, // Guardar las coordenadas en lugar de la dirección
      ocupacion,
      email,
    });

    await nuevoLocal.save();

    res.json({ files: req.files, message: 'Files uploaded and offer saved successfully' });
  } catch (error) {
    console.error('Error interno del servidor:', error);
    res.status(500).json({ error: "Internal server error" });
  }
}








async function mostrarTodasOfertasConImagenes(req, res) {
  try {
    const ocupacion = req.query.ocupacion;
    let ofertas;
    let locales;

    // Filtrar ofertas por ocupación si se proporciona, de lo contrario, obtener todas las ofertas
    if (ocupacion) {
      ofertas = await Oferta.find({ ocupacion: new RegExp(ocupacion, 'i') }).populate('Image');
      locales = await locals.find({ ocupacion: new RegExp(ocupacion, 'i') }).populate('Image');
    } else {
      ofertas = await Oferta.find().populate('Image');
      locales = await locals.find().populate('Image');
    }
    if (!ofertas || ofertas.length === 0) {
      return res.status(404).json({ error: 'No se encontraron ofertas' });
    }
    if (!locales || locales.length === 0) {
      return res.status(404).json({ error: 'No se encontraron ofertas' });
    }

    const procesarImagenes = async (items, isLocal) => {
      return await Promise.all(items.map(async (item) => {
        try {
          const imageFileId = isLocal ? item.Image[0] : item.Image;
          const imageFile = await FileSchema.findOne({ _id: imageFileId });

          if (imageFile && ['image/jpeg', 'image/jpg', 'image/png'].includes(imageFile.mimetype)) {
            const fs = require('fs');
            const imageData = fs.readFileSync(imageFile.path);
            const base64Image = Buffer.from(imageData).toString('base64');
            const imageUrl = `data:${imageFile.mimetype};base64,${base64Image}`;
            return { ...item._doc, imageUrl };
          } else {
            return { ...item._doc, imageUrl: null };
          }
        } catch (imageError) {
          console.error('Error al buscar la imagen:', imageError);
          return { ...item._doc, imageUrl: null };
        }
      }));
    };
    const ofertasConImagenes = await procesarImagenes(ofertas);
    const localesConImagenes = await procesarImagenes(locales);

    res.json({ ofertas: ofertasConImagenes, locales: localesConImagenes });

  } catch (error) {
    console.error('Error interno del servidor:', error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}






async function mostrarDetalleOfertaLocal(req, res) {
  try {
    const id = req.params.id; // Obtener el ID de la solicitud

    let elemento;
    elemento = await Oferta.findById(id).populate('Image');

    // Si no se encuentra la oferta con el ID proporcionado, buscar el local por su ID
    if (!elemento) {
      elemento = await locals.findById(id).populate('Image');
    }

    // Verificar si se encontró un elemento con el ID dado
    if (!elemento) {
      return res.status(404).json({ error: 'No se encontró ningún elemento con el ID proporcionado' });
    }

    const procesarImagen = async (item) => {
      try {
        const imageFileIds = Array.isArray(item.Image) ? item.Image : [item.Image];
        const imageUrls = [];

        for (const imageFileId of imageFileIds) {
          const imageFile = await FileSchema.findOne({ _id: imageFileId });

          if (imageFile && ['image/jpeg', 'image/jpg', 'image/png'].includes(imageFile.mimetype)) {
            const fs = require('fs');
            const imageData = fs.readFileSync(imageFile.path);
            const base64Image = Buffer.from(imageData).toString('base64');
            const imageUrl = `data:${imageFile.mimetype};base64,${base64Image}`;
            imageUrls.push(imageUrl);
          }
        }

        return { ...item._doc, imageUrls };
      } catch (imageError) {
        console.error('Error al buscar la imagen:', imageError);
        return { ...item._doc, imageUrls: [] };
      }
    };


    const elementoConImagen = await procesarImagen(elemento);

    res.json(elementoConImagen); // Devolver el elemento con su imagen procesada

  } catch (error) {
    console.error('Error interno del servidor:', error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}




module.exports = {
  uploadSingle,
  uploadMultiple,
  mostrarTodasOfertasConImagenes,
  mostrarDetalleOfertaLocal

};