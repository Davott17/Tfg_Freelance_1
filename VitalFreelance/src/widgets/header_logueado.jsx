import { Link } from "react-router-dom"
import logo from '../assets/Logo.png'
import logo_nombre from '../assets/Nombre_logo.png'
import avatar from '../assets/avatar.jpg'
import '../CSS/header_logueado.css'

function header() {
    return (
        <>

            <div className="fondo_header_log  flex logo_absoluto">

                <div className='centrar flex zona1'>
                    <Link to='/'><img className='logo' src={logo} alt="" /></Link>
                    <Link to='/'> <img className='logo_nombre' src={logo_nombre} alt="" /></Link>
                </div>

                <div className='centrar flex zona2'>
                    <Link to="/Buscador"><a href="">Busqueda</a></Link>
                    <Link to="/Buscador"><a href="">Gimnasios</a></Link>
                    <Link to="/Buscador"><a href="">Tiendas</a></Link>
                    <div >
                        <Link to="/areaCliente">
                            <img className='avatar' src={avatar} alt="avatar" />
                        </Link>
                    </div>

                </div>
            </div>

        </>
    )
}

export default header