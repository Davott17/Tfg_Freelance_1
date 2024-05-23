import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OfertaConImagen = ({ ofertaId }) => {
  const [oferta, setOferta] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfertaConImagen = async () => {
      try {
        const response = await axios.get(`http://localhost:3977/api//oferta/ofertas/${ofertaId}`);
        setOferta(response.data.oferta);
        
        const imageResponse = await axios.get(`http://localhost:3977/api//oferta/imagenes/${response.data.oferta.Image.filename}`, {
          responseType: 'blob'
        });
        const imageURL = URL.createObjectURL(new Blob([imageResponse.data]));
        setImageSrc(imageURL);
      } catch (error) {
        setError('Error al cargar la oferta o la imagen');
      }
    };

    fetchOfertaConImagen();
  }, [ofertaId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!oferta || !imageSrc) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{oferta.title}</h1>
      <p>{oferta.description}</p>
      <img src={imageSrc} alt={oferta.title} />
      <p>Zona de Trabajo: {oferta.zona_trabajo}</p>
      <p>Ocupación: {oferta.ocupacion}</p>
      <p>Email: {oferta.email}</p>
    </div>
  );
};

export default OfertaConImagen;