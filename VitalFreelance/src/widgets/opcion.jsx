import '../CSS/opciones.css'
import  pesa from '../assets/Profesional.jpg'
import gimnasio from '../assets/gym.jpeg'
import latido_corazon from '../assets/latido-del-corazon.png'
import Proteinas from '../assets/proteina.avif'
import Barra_separadora from './barra'

function Opciones() {
    return (
        <>
            <div className="opciones_fondo">
                <h2 className='titulo_opciones'>¿Que servicios puedo encontrar?</h2>


                <div id="brxe-lbgdha" className="brxe-container">
                    <div id="brxe-zweqwe" className="brxe-divider horizontal">
                        <div class="line"> </div>
                    </div>
                </div>


                <div className="opciones_contenedor">
                    <div className="opciones colunm">
                        <img className='img_opciones' src={Proteinas} alt="" />
                        <div className='contenedor_explicacion'>
                            <h3>Optimiza tu rendimiento con la nutrición deportiva de alta calidad</h3>
                            <p>En el mundo del fitness y el bienestar, las proteínas son esenciales para construir músculo, reparar tejidos y optimizar tu rendimiento físico. </p>
                        </div>
                    </div>
                    <div className="opciones colunm">
                        <img className='img_opciones' src={gimnasio} alt="" />
                        <div className='contenedor_explicacion'>
                            <h3>Alcanza tus metas de fitness en gimnasios de última generación</h3>
                            <p>¿Estás buscando transformar tu cuerpo y alcanzar tus metas de fitness de manera segura y efectiva?</p>
                        </div>
                    </div>
                    <div className="opciones colunm">
                        <img className='img_opciones' src={latido_corazon} alt="" />
                        <div className='contenedor_explicacion'>
                            <h3>Optimiza tu bienestar con la guía de expertos en salud y bienestar</h3>
                            <p>En un mundo que avanza a un ritmo acelerado, el bienestar integral se ha convertido en un pilar fundamental para una vida plena y significativa. </p>
                        </div>
                    </div>
                    <div className="opciones colunm">
                        <img className='img_opciones' src={pesa} alt="" />
                        <div className='contenedor_explicacion'>
                            <h3>Profesionales en Alimentación y Deporte</h3>
                            <p>Si estás buscando alcanzar tus metas de fitness de manera segura y efectiva, la asesoría de profesionales en entrenamiento personal es la clave del éxito.</p>
                        </div>
                    </div>
                </div>

                <div id="brxe-lbgdha" className="brxe-container">
                    <div id="brxe-zweqwe" className="brxe-divider horizontal">
                        <div class="line"> </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Opciones





