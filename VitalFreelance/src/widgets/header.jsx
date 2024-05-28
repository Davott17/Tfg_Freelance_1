import logo from '../assets/Logo.png'
import logo_nombre from '../assets/Nombre_logo.png'
import { Link } from "react-router-dom"


function Header() {

    return (
        <>
            <div className="fondo flex logo_absoluto">
                <div className='centrar flex zona1'>
                    <Link to='/'><img className='logo' src={logo} alt="" /></Link>
                    <Link to='/'> <img className='logo_nombre' src={logo_nombre} alt="" /></Link>

                </div>
                <div className='centrar flex zona2'>
                    <Link to="/Registro"><a href="">Busqueda</a></Link>
                    <Link to="/login"><button>Log in</button></Link>
                    <Link to="/Registro"><button>Registrarse</button></Link>
                </div>
            </div>

        </>
    )
}
export default Header