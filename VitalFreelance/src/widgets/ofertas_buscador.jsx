import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/ofertas_buscador.css';

const TodasLasOfertas = ({ ocupacion, ofertas, locales }) => {
    const [filteredOfertas, setFilteredOfertas] = useState([]);
    const [filteredLocales, setFilteredLocales] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOfertasConImagenes = async () => {
            try {
                const response = await axios.get('http://localhost:3977/api/oferta/ofertas-con-imagenes', {
                    params: { ocupacion }
                });
                console.log(response);
                setFilteredOfertas(response.data.ofertas || []);
                setFilteredLocales(response.data.locales || []);
            } catch (error) {
                setError('Error al cargar las ofertas');
            }
        };

        fetchOfertasConImagenes();
    }, [ocupacion]);

    if (error) {
        return <div>{error}</div>;
    }

    if ((!filteredOfertas || filteredOfertas.length === 0) && (!filteredLocales || filteredLocales.length === 0)) {
        return <div>No hay ofertas disponibles</div>;
    }

    return (
        <div className='row_wrap'>
            {filteredOfertas.map((oferta) => (
                <Link to={`/Box_entrenamiento/${oferta._id}`} key={oferta._id} className='oferta_link'>
                    <div className='oferta_contenedor'>
                        {oferta.imageUrl ? (
                            <img className='imagen_fondo_oferta' src={oferta.imageUrl} alt={oferta.title} />
                        ) : (
                            <p>No hay imagen disponible</p>
                        )}
                        <div>
                            <p>{oferta.title}</p>
                            <p className='overflow_Text'>{oferta.description}</p>
                            <p>Ocupación: {oferta.ocupacion}</p>
                        </div>
                    </div>
                </Link>
            ))}
            {filteredLocales.map((local) => (
                <Link to={`/Box_entrenamiento/${local._id}`} key={local._id} className='oferta_link'>
                    <div className='oferta_contenedor'>
                        {local.imageUrl ? (
                            <img className='imagen_fondo_oferta' src={local.imageUrl} alt={local.title} />
                        ) : (
                            <p>No hay imagen disponible</p>
                        )}
                        <div>
                            <p>{local.title}</p>
                            <p className='overflow_Text'>{local.description}</p>
                            <p>Ocupación: {local.ocupacion}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default TodasLasOfertas;
