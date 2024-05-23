import { Link } from 'react-router-dom'
import '../CSS/registro_login.css'
import logo from '../assets/Logo.png'
import logo_nombre from '../assets/Nombre_logo.png'
import fondo from '../assets/Fondo.png'
import { useState, useEffect, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import volver from '../assets/volver.png';
import { useNavigate } from 'react-router-dom';


const URI = 'http://localhost:3977/api/login';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {

        const token = localStorage.getItem('admin');
        if (token) {
            setAuthenticated(true);
            navigate("/areaCliente");

        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(URI, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (data.token) {
                localStorage.setItem('admin', data.token);
                localStorage.setItem('email', data.email);
                setAuthenticated(true);
                window.location.reload()
            } else {
                setError(data.msg);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error en el servidor');
        }

    };


    return (
        <>
            <div className="contenedor ">
                <img src={fondo} alt="" />
            </div>
            <div className="contenedor_principal ">

                <div>
                    <h1 className="h1_lr">Inicio de sessión</h1>
                    <p>Bienvenido a VitalFrelance. Rellena todos los campos para seguir con tu cambio.</p>
                    <Link to="/Registro/freelance"><a>Registrate como Freelancer</a></Link>
                    <br />
                    <Link to="/Registro"><a>Registrate como cliente</a></Link>
                </div>
                <form className="  form_l " action="submit" onsubmit="return validateForm()" noValidate  onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}
                    {authenticated && <p>¡Has iniciado sesión correctamente!</p>}
                    <div className=' colunm'>
                        <label for="nombre">Email</label>
                        <input className="input_l" type="text" name="email" id="nombreInput" value={email} required onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className=' colunm'>
                        <label for="contra">Contraseña</label>
                        <input className="input_l" type="password" name="contra" required id="passwordInput" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button className="button_lr" id="submitButton" type="submit">Acceder</button>
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
export default Login