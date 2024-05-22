import multer, { diskStorage } from 'multer';
import { extname } from 'path';
import { findById, findByIdAndUpdate } from './models/user'; // Modelo de Mongoose para User

// Configuración de Multer para el almacenamiento de imágenes de perfil
const storage = diskStorage({
  destination: function (req, file, cb) {
    // Directorio donde se guardarán las imágenes (dentro de tu proyecto)
    cb(null, 'uploads/profile_pictures'); 
  },
  filename: function (req, file, cb) {
    // Asigna un nombre único a cada archivo para evitar conflictos
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + extname(file.originalname)); // Mantiene la extensión original
  }
});

const upload = multer({ storage: storage }); // Crea el objeto 'upload' para usarlo en el middleware

async function updateUserProfile(req, res) {
  // 1. Obtener el ID del usuario desde el localStorage y validar
  const userIdFromLocalStorage = localStorage.getItem('admin');
  if (!userIdFromLocalStorage || !mongoose.Types.ObjectId.isValid(userIdFromLocalStorage)) {
    return res.status(400).json({ error: 'userId inválido', toastStatus: 'errorInvalidUserId' });
  }

  try {
    // 2. Middleware de Multer para manejar la subida de la imagen
    upload.single('profilePicture')(req, res, async function (err) { 
      if (err) {
        // Si hay un error en la subida, devolvemos un mensaje de error
        return res.status(400).json({ error: 'Error al subir la imagen', toastStatus: 'errorProfilePicture' });
      }

      // 3. Buscar el usuario en la base de datos
      const existingUser = await findById(userIdFromLocalStorage);
      if (!existingUser) {
        return res.status(404).json({ message: 'Usuario no encontrado', toastStatus: 'errorUserNotFound' });
      }

      // 4. Actualizar los datos del usuario en la base de datos
      const updatedUser = await findByIdAndUpdate(userIdFromLocalStorage, {
        // ... (otros campos a actualizar si es necesario)
        profilePicture: req.file ? req.file.filename : existingUser.profilePicture // Si se subió una nueva imagen, la usamos, sino mantenemos la anterior
      }, { new: true }); // Esta opción devuelve el documento actualizado

      // 5. Devolver una respuesta exitosa con los datos del usuario actualizados
      res.json({ message: 'Perfil actualizado con éxito', toastStatus: 'success', user: updatedUser });
    });
  } catch (error) {
    // Manejo de errores generales
    console.error('Error al actualizar el perfil del usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor', toastStatus: 'errorServer' });
  }
}

module.exports = {
    updateUserProfile
}