import logo from '../assets/Logo.png'
import logo_nombre from '../assets/Nombre_logo.png'
import { Link } from "react-router-dom"


function Header() {

    return (
        <>
                <div className="fondo flex logo_absoluto">
                    <div className='centrar flex zona1'>
                        <img className='logo' src={logo} alt="" />
                        <img className='logo_nombre' src={logo_nombre} alt="" />
                    </div>
                    <div className='centrar flex zona2'>
                        <a href="">Busqueda</a>
                        <a href="">Gimnasios</a>
                        <a href="">Tiendas</a>
                    <Link to=""><button>Log in</button></Link>
                    <Link to="/Registro"><button>Registrarse</button></Link>
                    </div>
                </div>
            
        </>
    )
}
export default Header