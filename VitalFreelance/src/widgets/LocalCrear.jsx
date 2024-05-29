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

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const newFiles = Array.from(files);
        setFormData({ ...formData, [name]: newFiles });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            // Agregar archivos al FormData
            formData.Image.forEach((file, index) => {
                formDataToSend.append(`Image${index}`, file);
            });
            // Agregar otros campos del formulario al FormData
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('zona_trabajo', formData.zona_trabajo);
            formDataToSend.append('ocupacion', formData.ocupacion);
            formDataToSend.append('email', formData.email);

            const response = await fetch('http://localhost:3977/api/oferta/registrar-imagen', {
                method: 'POST',
                body: formDataToSend
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
                            <input className="input_l" type="text" name='title' onChange={handleInputChange} />
                        </div>
                        <div className='colunm'>
                            <label>Descripción:</label>
                            <textarea className="input_l_text" name='description' onChange={handleInputChange} height="40px" />
                        </div>
                        <div className='colunm'>
                            <label>Zona de Trabajo:</label>
                            <input type="text" className='input_l' name='zona_trabajo' onChange={handleInputChange} />
                        </div>
                        <div className='colunm'>
                            <label>Ocupación:</label>
                            <input type="text" className='input_l' name='ocupacion' onChange={handleInputChange} />
                        </div>
                        <div className='colunm'>
                            <label>Imagen:</label>
                            <input type="file" className='inputfile' name='Image' accept="image/*" multiple onChange={handleFileChange} />
                        </div>
                        <button type="submit">Crear oferta</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegistroImagen;
