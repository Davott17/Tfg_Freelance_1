import React, { useState } from 'react';
import '../CSS/oferta.css'
import { useNavigate } from 'react-router-dom';

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
        const newValue = files ? files[0] : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Crear un objeto FormData
            const formDataToSend = new FormData();
            // Adjuntar cada campo del formulario al FormData
            Object.keys(formData).forEach((key) => {
                formDataToSend.append(key, formData[key]);
            });

            console.log(formDataToSend);
            const response = await fetch('http://localhost:3977/api/oferta/registrar-imagen', {
                method: 'POST',
                body: formDataToSend, // Envía el FormData en lugar de JSON.stringify(formData)
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
            <div className="contenedor ">
                <img src="" alt="" />
            </div>
            <div className="contenedor_principal ">
                <div className=''>
                    <h2>Registrar Oferta</h2>
                    <form className='form_l' typeof='submit' onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className='colunm'>
                            <label>Título:</label>
                            <input className="input_l" type="text" name='title' onChange={handleChange} />
                        </div>
                        <div className='colunm'>
                            <label>Descripción:</label>
                            <textarea className="input_l_text" name='description' onChange={handleChange} height="40px"/>
                        </div>
                        <div className='colunm'>
                            <label>Zona de Trabajo:</label>
                            <input type="text" className='input_l' name='zona_trabajo' onChange={handleChange} />
                        </div>
                        <div className='colunm'>
                            <label>Ocupación:</label>
                            <input type="text"  className='input_l' name='ocupacion' onChange={handleChange} />
                        </div>
                        <div className='colunm'>
                            <label>Imagen:</label>
                            <input type="file"  className='inputfile' name='Image' accept="image/*" onChange={handleChange} />
                        </div>
                        <button type="submit">Crear oferta</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegistroImagen;
