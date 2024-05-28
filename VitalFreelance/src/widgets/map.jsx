import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import axios from 'axios';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import '../CSS/map.css';

const Map = () => {
  const [ofertas, setOfertas] = useState([]);
  const [error, setError] = useState(null);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const madrid = { lat: 40.4165, lng: -3.70256 };
  const zoom = 14;

  maptilersdk.config.apiKey = 'YPheQw7gSXzzzgnPBYT6';

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

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [madrid.lng, madrid.lat],
      zoom: zoom
    });
  }, [madrid.lng, madrid.lat, zoom]);

  useEffect(() => {
    if (!map.current || !ofertas.length) return;

    ofertas.forEach((oferta) => {
      new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat([oferta.zona_trabajo.lng, oferta.zona_trabajo.lat])
        .addTo(map.current);
    });
  }, [ofertas]);

  return (
    <div className="map-wrap">
      {error && <div>{error}</div>}
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default Map;
