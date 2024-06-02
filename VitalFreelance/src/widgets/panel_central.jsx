import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/panel_lateral.css';

function PanelCentral({ email }) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3977/api/oferta/ofertas-con-imagenes', {
                    params: { email }
                });
                const { ofertas, locales } = response.data;
                const combinedData = [...ofertas, ...locales];
                setData(combinedData);
            } catch (error) {
                setError('Error al cargar los datos');
            }
        };

        fetchData();
    }, [email]);

    return (
        <div className=''>
            {error && <div>Error: {error}</div>}
            <div className='contenedor_central_cliente'>
                <table>
                    <thead>
                        <tr>
                            <th>Título / Nombre</th>
                            <th>Descripción / Dirección</th>
                            <th>Ocupación / Teléfono</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {data.map((item, index) => (
                            
                            <tr key={index}>
                                <td><Link to={`/Box_entrenamiento/${item._id}`} key={item._id} className='oferta_link'>{item.title || item.nombre}</Link></td>
                                <td>{item.description || item.direccion}</td>
                                <td>{item.ocupacion || item.telefono}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='crear'>
                <div className='anadir'>
                    Crea tu oferta
                    <p>¿Tienes un servicio o producto que puede transformar la vida de las personas? ¡No lo guardes para ti! Compartir tu oferta es el primer paso para ayudar a otros a alcanzar sus metas de salud y bienestar.</p>
                    <Link to="/RegistroOferta"><button className='button'>Crear una oferta ahora</button></Link>
                </div>
                <div className='anadir'>
                    Añade tu local
                    <p>¿Tienes un local, tienda o gimnasio que inspira salud y vitalidad? ¡No te quedes en el anonimato! Publicar tu oferta es la clave para atraer nuevos clientes y hacer crecer tu comunidad.</p>
                    <Link to="/RegistroLocal"><button className='button'>Añadir tu local</button></Link>
                </div>
            </div>
        </div>
    );
}

export default PanelCentral;
