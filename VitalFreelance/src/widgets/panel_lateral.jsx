import '../CSS/panel_lateral.css';
import Rating from './Rating';
import logo from '../assets/avatar.jpg';
import { useState, useEffect } from 'react';
import axios from 'axios';

function PanelLateral() {
    const [data, setData] = useState(null); // Objeto de datos del usuario

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const email = localStorage.getItem('email');
            console.log(email);
            const res = await axios.get(`http://localhost:3977/api/getDatalog?email=${email}`); // Pasar el email como parámetro de consulta
            setData(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            <div className=' contenedor_lateral_cliente'>
                <div className='contenedor'>
                    <div>
                        <img className='contenedor_imagen' src={logo} alt='' />
                    </div>
                    <div>
                        {data ? (
                            <>
                                <h2>{data.name} {data.lastname}</h2>
                                <h2>{data.usuario}</h2>
                            </>
                        ) : (
                            <p>Cargando datos del usuario...</p>
                        )}
                    </div>
                    <div>
                        <Rating />
                    </div>
                </div>
            </div>
        </>
    );
}

export default PanelLateral;
