import { Link } from 'react-router-dom'
import '../CSS/registro_login.css'
import logo from '../assets/Logo.png'
import logo_nombre from '../assets/Nombre_logo.png'
import fondo from '../assets/Fondo.png'

function Login() {


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
                <form className="  form_l " action="submit" onsubmit="return validateForm()" novalidate>
                    <div className=' colunm'>
                        <label for="nombre">Usuario</label>
                        <input className="input_l" type="text" name="nombre" id="nombreInput" required/>
                    </div>
                    <div className=' colunm'>
                        <label for="contra">Contraseña</label>
                        <input className="input_l" type="password" name="contra" required id="passwordInput" />
                    </div>
                    <button className="button_lr" id="submitButton" type="submit">Acceder</button>
                </form>
                <div className='center centrar  '>
                    <img className='logo' src={logo} alt="" />
                    <img className='logo_nombre' src={logo_nombre} alt="" />
                </div>
            </div>
        </>
    )

}
export default Login