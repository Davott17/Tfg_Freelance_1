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
    <div>
      {ofertas.map((oferta) => (
        <div className='contenedor_ofertas' key={oferta._id}>
          <h1>{oferta.title}</h1>
          <p>{oferta.description}</p>
          {oferta.imageUrl ? (
            <img src={oferta.imageUrl} alt={oferta.title} />
          ) : (
            <p>No hay imagen disponible</p>
          )}
          <p>Zona de Trabajo: {oferta.zona_trabajo}</p>
          <p>Ocupación: {oferta.ocupacion}</p>
          <p>Email: {oferta.email}</p>
        </div>
      ))}
    </div>
  );
};

export default TodasLasOfertas;
