import { Link } from 'react-router-dom'
import '../CSS/registro_login.css'
import logo from '../assets/Logo.png'
import logo_nombre from '../assets/Nombre_logo.png'
import fondo from '../assets/Fondo.png'
import { useState, useEffect, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import volver from '../assets/volver.png';


function FRTD() {
    const [formData, setFormData] = useState({
        usuario: "",
        name: "",
        apellido: "",
        email: "",
        password: "",
        tel: "",
        n_empresa: "",
        trabajo: "",
    });
    const [error, setError] = useState(null);

    const [formErrors, setFormErrors] = useState({
        usuario: "",
        email: "",
        password: "",
        password2: "",
        passwordError1: "",
        foundUser: "",
        foundEmail: "",
    });

    const setErrorRef = useRef(setError);

    useEffect(() => {
        setErrorRef.current = setError;
    }, [setError]);

    const handleChange = (e) => {


        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validación de contraseñas al cambiar el campo
        if (name === "password" || name === "password2") {
            setFormErrors({
                ...formErrors,
                password2: formData.password !== value ? "Las contraseñas no coinciden" : "",
            });

            // Validación de longitud de la contraseña
            if (name === "password" && value.length < 6) {
                setFormErrors({
                    ...formErrors,
                    passwordError1: "La contraseña debe tener al menos 6 caracteres",
                });
            } else if (name === "password") {
                // Borra el error de longitud si la contraseña es válida
                setFormErrors({
                    ...formErrors,
                    passwordError1: "",
                });
            }
        }

        // Validación del email
        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setFormErrors({
                ...formErrors,
                email: !emailRegex.test(value) ? "Correo electrónico inválido" : "",
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validación antes de enviar
        if (formData.password !== formData.password2) {
            setFormErrors({ ...formErrors, password2: "Las contraseñas no coinciden" });
            return;
        }

        try {

            const response = await fetch("http://localhost:3977/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Registro exitoso:", data);
                // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
            } else {
                const errorData = await response.json();
                if (errorData.toastStatus === "errorUsuario") {
                    toast.error(errorData.error);
                } else if (errorData.toastStatus === "errorEmail") {
                    toast.error(errorData.error)
                }
                setError(errorData); // Almacena todo el objeto de errores
            }
        } catch (error) {
            // Manejo de errores de red u otros
            setErrorRef.current("Error en la conexión con el servidor");
            console.error("Fetch error:", error);
        }
    };

    return (
        <>
            <div><Toaster position="bottom-right" reverseOrder={true} /></div>

            <div className="contenedor_fondo ">
                <img src={fondo} alt="" />
            </div>
            <div className="contenedor_principal ">

                <div>
                    <h1 className="h1_lr">Crear una cuenta</h1>
                    <p>Bienvenido a VitalFrelance. Rellena todos los campos para seguir con tu cambio.</p>
                    <Link to="/Registro"><a>Registrate como Cliente</a></Link>
                    <br />
                    <Link to="/Login"><a>Ya tengo una cuenta</a></Link>
                </div>
                <form className=" form_lr " action="submit" onsubmit="return validateForm()" noValidate onSubmit={handleSubmit}>
                    <div className=' colunm'>
                        <label for="nombre">Usuario</label>
                        {error?.usuario && <p className="error-message">{error.usuario}</p>}
                        <input className="input_lr" type="text" name="usuario" id="userInput" required onChange={handleChange} />
                    </div>
                    <div className='colunm'>
                        <label for="nombre">Nombre</label>
                        <input className="input_lr" type="text" name="name" id="nombreInput" required onChange={handleChange} />
                    </div>

                    <div className=' colunm'>
                        <label for="nombre">Apellido</label>
                        <input className="input_lr" type="text" name="lastname" id="apellidoInput" required onChange={handleChange} />
                    </div>
                    <div className=' colunm'>
                        <label for="nombre">Teléfono</label>
                        <input className="input_lr" type="number" name="tel" id="TelInput" required onChange={handleChange} />
                    </div>
                    <div className='colunm'>
                        <div id="errormenssaje"></div>
                        <label for="correo">Nombre de la empresa (Opcional)</label>
                        <input className="input_lr" type="text" name="n_empresa" id="empresaInput" onChange={handleChange} />
                    </div>
                    <div className=' colunm'>
                        <div id="errormenssaje"></div>
                        <label for="correo">Trabajo (Opcional)</label>
                        <input className="input_lr" type="text" name="trabajo" id="empresaInput" onChange={handleChange} />
                    </div>
                    <div className="gap_lr colunm">
                        <label htmlFor="email">Email</label>
                        {error?.foundEmail && (
                            <p className="error-message">{error.foundEmail}</p>
                        )}
                        <input
                            className="input_lr"
                            type="email"
                            name="email"
                            id="emailInput"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="gap_lr colunm">
                        <label htmlFor="password">Contraseña</label>
                        {formErrors.passwordError1 && (
                            <p className="error-message">{formErrors.passwordError1}</p>
                        )}
                        {error?.passwordError && (
                            <p className="error-message">{error.passwordError}</p>
                        )}
                        <input
                            className="input_lr"
                            type="password"
                            name="password"
                            required
                            id="passwordInput"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="gap_lr colunm">
                        <label htmlFor="password2">Repite la Contraseña</label>
                        {formErrors.password2 && (
                            <p className="error-message">{formErrors.password2}</p>
                        )}
                        <input
                            className="input_lr"
                            type="password"
                            name="password2"
                            required
                            id="passwordInput1"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="gap_lr contenedor-checkbox">
                        <input
                            className="input_lr"
                            type="checkbox"
                            name="Terminos_condiciones"
                            id=""
                            required
                        />
                        <label htmlFor="Terminos_condiciones">
                            Acepto los términos de política y privacidad
                        </label>
                    </div>
                    <button className="input_l" id="submitButton" type="submit">Acceder</button>
                </form>
                <div className='center centrar  '>
                    <img className='logo' src={logo} alt="" />
                    <img className='logo_nombre' src={logo_nombre} alt="" />
                </div>
            </div>
            <div className="boton_volver">
                <Link to="/">
                    <img className="boton_volver_img" src={volver} alt="volver" />
                </Link>
            </div>
        </>
    )

}
export default FRTD