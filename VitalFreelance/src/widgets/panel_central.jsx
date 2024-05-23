import { Link } from 'react-router-dom'
import '../CSS/panel_lateral.css'
import Editar from '../assets/editar.png'
import eliminar from '../assets/marca-x.png'

function panel_central() {

    return (
        <div className=''>
            <div className=' contenedor_central_cliente'>
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
                        </tbody>
                    </table>
                </div>
            </div>
                <div className='crear'>
                    <div className='anadir'> 
                        Crea tu oferta
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas sapiente, laborum architecto saepe cum, temporibus accusamus nostrum quam enim debitis asperiores repellendus in unde minima suscipit, quibusdam perspiciatis nobis quae?</p>
                       <Link to="/RegistroOferta"> <button className='button'>Crear una oferta ahora</button></Link>
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