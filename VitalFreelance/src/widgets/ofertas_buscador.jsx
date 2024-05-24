import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CSS/ofertas_buscador.css'



const TodasLasOfertas = () => {
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
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!ofertas || ofertas.length === 0) {
        return <div>No hay ofertas disponibles</div>;
    }

    return (
        <>
            <div className='row_wrap'>
                {ofertas.map((oferta) => (
                    <div className='oferta_contenedor ' key={oferta._id}>

                        {oferta.imageUrl ? (
                            <img className='imagen_fondo_oferta' src={oferta.imageUrl} alt={oferta.title} />
                        ) : (
                            <p>No hay imagen disponible</p>
                        )}
                        <div className=''>

                            <p>{oferta.title}</p>
                            <p className='overflow_Text'>{oferta.description}</p>
                            <p>Ocupación: {oferta.ocupacion}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TodasLasOfertas;
