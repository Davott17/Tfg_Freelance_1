import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/panel_lateral.css';
import Editar from '../assets/editar.png';
import eliminar from '../assets/marca-x.png';

function PanelCentral({ email }) {
    const [ofertas, setOfertas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOfertasConImagenes = async () => {
            try {
                const response = await axios.get('http://localhost:3977/api/oferta/ofertas-con-imagenes', {
                    params: { email }
                });
                console.log(response);
                setOfertas(response.data);
            } catch (error) {
                setError('Error al cargar las ofertas');
            }
        };

        fetchOfertasConImagenes();
    }, [email]);

    return (
        <div className=''>
            <div className='contenedor_central_cliente'>
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Descripción</th>
                            <th>Ocupación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ofertas.map((oferta, index) => (
                            <tr key={index}>
                                <td>{oferta.title}</td>
                                <td>{oferta.description}</td>
                                <td>{oferta.ocupacion}</td>
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
                    <button className='button'>Añadir tu local ahora</button>
                </div>
            </div>
        </div>
    );
}

export default PanelCentral;
