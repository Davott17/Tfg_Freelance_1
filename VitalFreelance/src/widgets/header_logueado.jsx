import { Link } from "react-router-dom"
import logo from '../assets/Logo.png'
import logo_nombre from '../assets/Nombre_logo.png'
import '../CSS/header_logueado.css'

function header() {
    return (
        <>
        
            <div className="fondo_header_log  flex logo_absoluto">
                <div className='centrar flex zona1'>
                    <img className='logo' src={logo} alt="" />
                    <img className='logo_nombre' src={logo_nombre} alt="" />
                </div>
                <div className='centrar flex zona2'>
                    <a href="">Busqueda</a>
                    <a href="">Gimnasios</a>
                    <a href="">Tiendas</a>
                    <div >
                        <Link to="/areaCliente">
                            <img className='avatar' src={logo} alt="avatar" />
                        </Link>
                    </div>

                </div>
            </div>

        </>
    )
}

export default header