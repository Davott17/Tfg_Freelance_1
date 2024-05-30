import { Link } from "react-router-dom";
import logo from '../assets/Logo.png';
import logo_nombre from '../assets/Nombre_logo.png';
import avatar from '../assets/avatar.jpg';
import '../CSS/header_logueado.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [token, setToken] = useState('');
    const [showLogout, setShowLogout] = useState(false);
    const [logoutClickable, setLogoutClickable] = useState(true); // Estado para controlar si el botón es pulsable o no
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('admin');
        localStorage.removeItem('email');
        setToken('');
        navigate("/");
    };

    useEffect(() => {
        const token = localStorage.getItem('admin');
        if (!token) {
            navigate("/");
        }
    }, [token, navigate]);

    return (
        <div className="fondo_header_log flex logo_absoluto">
            <div className='centrar flex zona1'>
                <Link to='/areaCliente'><img className='logo' src={logo} alt="" /></Link>
                <Link to='/areaCliente'><img className='logo_nombre' src={logo_nombre} alt="" /></Link>
            </div>

            <div className='centrar flex zona2'>
                <Link to="/Buscador"><a href="">Busqueda</a></Link>
                <div className="avatar-container"
                    onMouseEnter={() => setShowLogout(true)}
                    onMouseLeave={() => setShowLogout(false)}
                >
                    {showLogout && (
                        <button
                            className={`logout-button ${logoutClickable ? '' : 'not-clickable'}`}
                            onClick={handleLogout} // Solo ejecuta handleLogout si el botón es pulsable

                        >
                            Log out
                        </button>
                    )}
                    <Link to="/areaCliente">
                        <img className='avatar' src={avatar} alt="avatar" />
                    </Link> 
                </div>
            </div>
        </div>
    );
}

export default Header;
