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
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas sapiente, laborum architecto saepe cum, temporibus accusamus nostrum quam enim debitis asperiores repellendus in unde minima suscipit, quibusdam perspiciatis nobis quae?</p>
                    <Link to="/RegistroOferta"><button className='button'>Crear una oferta ahora</button></Link>
                </div>
                <div className='anadir'>
                    Añade tu local
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas sapiente, laborum architecto saepe cum, temporibus accusamus nostrum quam enim debitis asperiores repellendus in unde minima suscipit, quibusdam perspiciatis nobis quae?</p>
                    <Link to="/RegistroLocal"><button className='button'>Añadir tu local</button></Link>
                </div>
            </div>
        </div>
    );
}

export default PanelCentral;
