import '../CSS/panel_lateral.css'
import Rating from './Rating'

function panel_lateral() {
    



    
    return (
        <>
            <div className="contenedor_lateral_cliente">
                <div className='contenedor '>
                    <div className='contendor_imagen'>
                        <img src="" alt="" />
                    </div>
                    <div>
                        <h2>Nombre/apellido</h2>
                        <h2>Usuario</h2>
                    </div>
                    <div>
                        <p>Puntuacion</p>
                        <Rating/>
                    </div>
                </div>
            </div>
        </>)
}

export default panel_lateral