import { useState, useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import Header from '../widgets/header';
import Fondo from '../widgets/fondo';
import Opciones from '../widgets/opcion';
import Conocenos from '../widgets/conocenos';
import Galeria from '../widgets/galeria';

function Inicio() {
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('admin');
        if (token) {
            setToken(token);
            navigate("/areaCliente");
        }
    }, []);

    return (
        <div className="body_background_naranja">
            <Header />
            <Fondo />
            <Opciones />
            <Galeria />
            <Conocenos />
        </div>
    );
}

export default Inicio;
