import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../CSS/Box_entrenamiento.css';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import Header from '../widgets/header_logueado';
import '../CSS/map.css';
import volver from '../assets/volver.png'

const Box_entrenamiento = () => {
    const [oferta, setOferta] = useState(null);
    const [error, setError] = useState(null);
    maptilersdk.config.apiKey = 'YPheQw7gSXzzzgnPBYT6';
    const { id } = useParams();
    const mapContainer = useRef(null);
    const map = useRef(null);
    const zoom = 15; // Set your desired initial zoom level
    

    useEffect(() => {
        const fetchOferta = async () => {
            try {
                const response = await axios.get(`http://localhost:3977/api/oferta/${id}`);
                setOferta(response.data);
            } catch (error) {
                setError(`Error al cargar la oferta: ${error.message}`);
            }
        };

        fetchOferta();
    }, [id]);
    console.log(oferta);
    useEffect(() => {
        if (map.current || !oferta) return; // Stop map from initializing more than once or if oferta is null

        if (oferta.zona_trabajo) {
            map.current = new maptilersdk.Map({
                container: mapContainer.current,
                style: maptilersdk.MapStyle.STREETS,
                center: [oferta.zona_trabajo.lng, oferta.zona_trabajo.lat],
                zoom: zoom
            });
            new maptilersdk.Marker({ color: "#FF0000" })
                .setLngLat([oferta.zona_trabajo.lng, oferta.zona_trabajo.lat])
                .addTo(map.current);
        }
    }, [oferta]);

    if (error) {
        return (
            <div>
                <Header />
                <div>Error: {error}</div>
            </div>
        );
    }

    if (!oferta) {
        return (
            <div>
                <Header />
                <div>Cargando oferta...</div>
            </div>
        );
    }

    return (
        <>
            <div className='full_container'>
                <Header />
                <div className='container'>

                    <div className='text'>
                        <h1 className='h1'>{oferta.title}</h1>
                        <p><strong>{oferta.ocupacion}</strong></p>
                        <p>
                            <strong> Contacto :</strong>
                            <br />{email}
                            <br />{oferta.emp}
                            </p>
                        <p>
                            <strong> Descripción :</strong>
                            <br />
                            {oferta.description}  Ad recusandae, obcaecati quasi perspiciatis incidunt explicabo expedita id vel debitis distinctio, nesciunt totam enim commodi earum voluptates repellendus maxime?
                        </p>
                    </div>
                    <div className='visual'>
                        <div className="imagenes_oferta">
                            <img className="imagen_oferta_grande" src={oferta.imageUrls[0]} alt="Imagen grande" />
                            <div className='contenedor_imagenes_pequenas'>
                                {oferta.imageUrls.slice(1, 10).map((imageUrl, index) => (
                                    <img className="imagen_oferta_pequena" key={index + 1} src={imageUrl} alt={`Imagen ${index + 2}`} />
                                ))}
                            </div>
                        </div>
                        <div className='mapa' ref={mapContainer} style={{ height: '400px', width: '80%' }}></div>
                    </div>
                </div>

            </div>
            <div className="boton_volver_oferta">
                <Link to="/Buscador">
                    <img className="boton_volver_img" src={volver} alt="volver" />
                </Link>
            </div>
        </>
    );

};

export default Box_entrenamiento;

