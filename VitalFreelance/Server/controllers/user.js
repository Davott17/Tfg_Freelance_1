const bcryptjs = require("bcryptjs");
const jwt = require('../services/jwt');
const user = require("../models/user");
const { error } = require("console");
const { send } = require("process");
const SECRET_KEY = "ajdsdfuqkk39234sdfs742323499sdfhssdfss";
const toast = 'react-hot-toast';



async function register(req, res) {
    const { usuario, name, lastname, email, password, tel, n_empresa, trabajo } = req.body;
    try {
        // 1. Check for existing username & email (combined for efficiency)
        const existingUser = await user.findOne({ $or: [{ usuario }, { email }] });

        if (existingUser) {
            const errorField = existingUser.usuario === usuario ? "usuario" : "email";
            console.log(`error${errorField.charAt(0).toUpperCase() + errorField.slice(1)}`);
            return res.status(400).json({ error: `${errorField} is already taken`, toastStatus: `error${errorField.charAt(0).toUpperCase() + errorField.slice(1)}` });
        }

        // 4. Password Hashing
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // 5. Create and Save User
        const newUser = new user({
            usuario, name, lastname, email, password: hashedPassword, tel, n_empresa, trabajo
        });
        await newUser.save();

        // 6. Return Success Response (without password)
        res.status(201).json({ message: "Registration successful", toastStatus: "success" }); // Sending success message and status for the toast
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


async function login(req, res) {

    const { email, password } = req.body;
    try {
        console.log(email)
        const admin = await user.findOne({ email }); 
        if (!admin) throw { msg: "Error en email o contraseña" };
        const isMatch = await bcryptjs.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        const payload = {
            user: {
                _id: admin.id// Use admin.id instead of user.id
            }
        };

        const expiresIn = "1d";
        const token = jwt.createToken(payload, SECRET_KEY, { expiresIn }); // Definir la variable token
        console.log(token); // Log payload and token
        res.json({ token, email }); // Send the token in the response
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server error');
    }
}
// async function getDatalog(req,res){
//     console.log(req.params);
//     try {
//         const data = await user.find(req.params.id);
//         console.log(data)
//         res.status(200).json(data);

//         // broadcast("Un cliente se ha conectado al index")
//     } catch (error) {

//         res.status(500).send(error);
//     }
// }


// async function getDatalog(req, res) {
//     try {
//         console.log(req.body);
//         const data = await user.find({})
//         console.log(data.email); // Verifica qué parámetros se están recibiendo en la solicitud

//         try {
//             // Utiliza el método correcto para buscar datos en la base de datos, dependiendo de cómo esté estructurado tu modelo de usuario (user).
//             // Aquí estoy suponiendo que quieres buscar un usuario por su ID, por lo que utilizaré findById
//             const userData = await user.findOne({ email });
//             console.log(userData);
//             if (!userData) { // Comprueba si no se encontraron datos para el ID proporcionado
//                 return res.status(404).json({ message: 'Usuario no encontrado' });
//             }
//             // Si se encontraron datos, envíalos como respuesta
//             res.status(200).json(userData);
//         } catch (error) {
//             console.error('Error al buscar datos:', error);
//             res.status(500).json({ message: 'Error interno del servidor' });
//         }
//     } catch (error) {
//         console.error('Error al buscar datos:', error);
//         res.status(500).json({ message: 'Error interno del servidor' });
//     }
// }

async function getDatalog(req, res) {
    const email = req.query.email; // Obtener el email de la solicitud
    console.log(`Email recibido: ${email}`);
    try {
        const userData = await user.findOne({ email }); // Buscar el usuario por email
        if (!userData) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(userData);
    } catch (error) {
        console.error('Error al buscar datos del usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}


module.exports = {
    register,
    login,
    getDatalog,
};