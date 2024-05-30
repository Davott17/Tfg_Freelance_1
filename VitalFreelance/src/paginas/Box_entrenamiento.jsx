import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Box_entrenamiento = () => {
    const [oferta, setOferta] = useState(null);
    const [error, setError] = useState(null);
    let { id } = useParams();

    useEffect(() => {
        const fetchOferta = async () => {
            try {
                const response = await axios.get(`http://localhost:3977/api/oferta/${id}`);
                setOferta(response.data);
            } catch (error) {
                setError('Error al cargar la oferta');
            }
        };

        fetchOferta();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!oferta) {
        return <div>Cargando oferta...</div>;
    }

    return (
        <div>
            <h2> Esto esta bien</h2>
        </div>
    );
};

export default Box_entrenamiento;
