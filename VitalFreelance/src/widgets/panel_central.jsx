import '../CSS/panel_lateral.css'
import Editar from '../assets/editar.png'
import eliminar from '../assets/marca-x.png'

function panel_central() {

    return (
        <div className='fondo_blanco'>
            <div className='contenedor_central_cliente'>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Titulo</th>
                                <th>Descripcion</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr key="">
                                    <td className='tamano_titulo'></td>
                                    <td className='tamano'></td>                                  
                                    <td>
                                        <button  className="btn "><img src={Editar} alt="icono update" /></button>
                                        <button  className="btn btn-danger"><img src={eliminar} alt="icono delete" /></button>

                                    </td>
                                </tr><tr key="">
                                    <td className='tamano_titulo'></td>
                                    <td className='tamano'></td>                                  
                                    <td>
                                        <button  className="btn "><img src={Editar} alt="icono update" /></button>
                                        <button  className="btn btn-danger"><img src={eliminar} alt="icono delete" /></button>

                                    </td>
                                </tr><tr key="">
                                    <td className='tamano_titulo'></td>
                                    <td className='tamano'></td>                                  
                                    <td>
                                        <button  className="btn "><img src={Editar} alt="icono update" /></button>
                                        <button  className="btn btn-danger"><img src={eliminar} alt="icono delete" /></button>

                                    </td>
                                </tr>
                        </tbody>
                    </table>
                </div>
            </div>
                <div className='crear'>
                    <div className='anadir'> 
                        Crea tu oferta
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas sapiente, laborum architecto saepe cum, temporibus accusamus nostrum quam enim debitis asperiores repellendus in unde minima suscipit, quibusdam perspiciatis nobis quae?</p>
                        <button className='button'>Crear una oferta ahora</button>
                    </div>
                    <div className='anadir'> 
                        Añade tu local
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas sapiente, laborum architecto saepe cum, temporibus accusamus nostrum quam enim debitis asperiores repellendus in unde minima suscipit, quibusdam perspiciatis nobis quae?</p>
                        <button className='button'>Añadir tu local ahora</button>
                    </div>
                    
                </div>
        </div>
    )
}

export default panel_central