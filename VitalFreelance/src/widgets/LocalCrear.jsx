import React, { useState } from 'react';
import '../CSS/oferta.css';
import { useNavigate } from 'react-router-dom';
import volver from '../assets/volver.png'
import { Link } from 'react-router-dom'
import fondo from '../assets/Fondo.png'



const RegistroImagen = () => {
    const email = localStorage.getItem('email');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        zona_trabajo: "",
        ocupacion: "",
        Image: [],
        email: email,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        // Si es un campo de archivo (input type="file"), establece el archivo en lugar del valor
        const newValue = files ? Array.from(files) : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData.Image);
        try {
            // Crear un objeto FormData
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (Array.isArray(value)) { // Verifica si el valor es un array
                    value.forEach((item, index) => { // Itera sobre cada elemento del array
                        formDataToSend.append(`${key}[${index}]`, item); // Adjunta cada elemento al FormData
                    });
                } else {
                    formDataToSend.append(key, value); // Si no es un array, simplemente adjunta el valor al FormData
                }
            });
            


            console.log([...formDataToSend]); // Debugging line to see the FormData content

            const response = await fetch('http://localhost:3977/api/oferta/registrar-imagenes', {
                method: 'POST',
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            navigate("/areaCliente");
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <>
            <div className="contenedor_fondo ">
                <img src={fondo} alt="fondo" />
            </div>
            <div className="contenedor_principal ">
                <div className=''>
                    <h2>Registrar su local</h2>
                    <form className='form_l' typeof='submit' onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className='colunm'>
                            <label>Título:</label>
                            <input className="input_l" type="text" name='title' onChange={handleChange} />
                        </div>
                        <div className='colunm'>
                            <label>Descripción:</label>
                            <textarea className="input_l_text" name='description' onChange={handleChange} height="40px" />
                        </div>
                        <div className='colunm'>
                            <label>Direccion del local:</label>
                            <input type="text" className='input_l' name='zona_trabajo' onChange={handleChange} />
                        </div>
                        <div className='colunm'>
                            <label>Tipo de local:</label>
                            <input type="text" className='input_l' name='ocupacion' onChange={handleChange} />
                        </div>
                        <div className='colunm'>
                            <label>Imágenes:</label>
                            <input type="file" className='inputfile' name='Image' accept="image/*" multiple onChange={handleChange} />
                        </div>
                        <button type="submit">Crear oferta</button>
                    </form>
                </div>
            </div>
            <div className="boton_volver">
                <Link to="/areaCliente">
                    <img className="boton_volver_img" src={volver} alt="volver" />
                </Link>
            </div>
        </>
    );
};

export default RegistroImagen;
