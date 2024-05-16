import { Link } from 'react-router-dom'
import '../CSS/registro_login.css'
import logo from '../assets/Logo.png'
import logo_nombre from '../assets/Nombre_logo.png'
import fondo from '../assets/Fondo.png'

function FRTD() {
    return (
        <>
            <div className="contenedor ">
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
                <form className=" form_lr " action="submit" onsubmit="return validateForm()" novalidate>
                    <div className=' colunm'>
                        <label for="nombre">Usuario</label>
                        <input className="input_lr" type="text" name="nombre" id="userInput" required/>
                    </div>
                    <div className='colunm'>
                        <label for="nombre">Nombre</label>
                        <input className="input_lr" type="text" name="nombre" id="nombreInput" required/>
                    </div>

                    <div className=' colunm'>
                        <label for="nombre">Apellido</label>
                        <input className="input_lr" type="text" name="apellido" id="apellidoInput"required />
                    </div>
                    <div className=' colunm'>
                        <label for="nombre">Teléfono</label>
                        <input className="input_lr" type="number" name="apellido" id="TelInput" required/>
                    </div>
                    <div >
                        <div className='gap_lr colunm'>
                            <div id="errormenssaje"></div>
                            <label for="correo">Nombre de la empresa</label>
                            <input className="input_lr" type="text" name="empresa" id="empresaInput"  />
                        </div>
                        <div className='gap_lr colunm'>
                            <div id="errormenssaje"></div>
                            <label for="correo">Email</label>
                            <input className="input_lr" type="email" name="correo" id="emailInput" required />
                        </div>
                        <div className='gap_lr colunm'>
                            <label for="contra">Contraseña</label>
                            <input className="input_lr" type="password" name="contra" required id="passwordInput" />
                        </div>
                        <div className='gap_lr colunm'>
                            <label for="contra">Repite la Contraseña</label>
                            <input className="input_lr" type="password" name="contra2" required id="passwordInput1" />
                        </div>
                        <div className=" gap_lr contenedor-checkbox ">
                            <input className="input_lr" type="checkbox" name="Terminos_condiciones" id="" required />
                            <label for="Terminos_condiciones">Acepto los términos de política y privacidad</label>
                        </div>
                        <button className="input_l" id="submitButton" type="submit">Acceder</button>
                    </div>
                </form>
                <div className='center centrar  '>
                    <img className='logo' src={logo} alt="" />
                    <img className='logo_nombre' src={logo_nombre} alt="" />
                </div>
            </div>
        </>
    )

}
export default FRTD