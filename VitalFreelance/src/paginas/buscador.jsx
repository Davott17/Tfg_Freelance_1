// /src/components/buscador.js
import TodasLasOfertas from '../widgets/ofertas_buscador';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/buscador.css';
import Map from '../widgets/map';
import HeaderLog from '../widgets/header_logueado';

function Buscador() {
    const [ocupacion, setOcupacion] = useState('');
    const [ofertas, setOfertas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOfertasConImagenes = async () => {
            try {
                const response = await axios.get('http://localhost:3977/api/oferta/ofertas-con-imagenes');
                console.log(response);
                setOfertas(response.data);
            } catch (error) {
                setError('Error al cargar las ofertas');
            }
        };

        fetchOfertasConImagenes();
    },[]);
    const handleSearchChange = (event) => {
        setOcupacion(event.target.value);
    };
    const uniqueOcupaciones = [...new Set(ofertas.map(oferta => oferta.ocupacion))];

    return (
        <>
            <HeaderLog />
            <div className='mitad'>
                <div className='contendor_ofertas'>
                    <div className='input_buscador'>
                        <input
                            type="search"
                            list='sugerencias'
                            placeholder='Busqueda...'
                            value={ocupacion}
                            onChange={handleSearchChange}
                        />
                        <datalist id="sugerencias">
                        {uniqueOcupaciones.map((ocupacion, index) => (
                            <option key={index} value={ocupacion}></option>
                        ))} 
                        </datalist>
                    </div>
                    <TodasLasOfertas ocupacion={ocupacion} />
                </div>
                <Map />
            </div>
        </>
    );
}

export default Buscador;
