import imagen from '../assets/Fondo.png'
import { Link } from "react-router-dom"



function Fondo() {


    return (
        <>
            <div className='contendor_imagen'>
            <img className="imagen" src={imagen} alt="" />
                <div className='contenedor_central'>
                    <h1>Encuentra tu camino  al bienestar con <b>VitalFreelance</b></h1>
                    <p></p>
                    <div className='gap'>
                         <Link to="/Registro"><button>Date de alta como Cliente</button></Link>
                        <Link to="/Registro/freelance"><button>Date de alta como vendedor</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Fondo