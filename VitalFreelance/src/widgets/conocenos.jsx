import '../CSS/conocenos.css'
import bienestar from '../assets/bienestar.jpg'

function Conocenos() {

    return (
        <>
            <div className='contenedor_bienestar color body_background_naranja'>
                <div className='contenedor_texto_bienestar'>
                    <div>
                        <h2 className='titulo_opciones'>Toma el control de tu bienestar con la guía de un experto freelance en salud y bienestar</h2>
                        <p>En un entorno cada vez más acelerado y exigente, priorizar tu salud y bienestar se ha convertido en una necesidad fundamental. Si estás buscando alcanzar tus metas de salud y bienestar de manera segura y efectiva, la asesoría de un experto freelance en salud y bienestar te guiará hacia un camino de transformación y equilibrio.</p>
                    </div>
                    <img className='imagen_bienestar' src={bienestar} alt="" />
                </div>
                <button className="aprende_boton">Aprende mas sobre nosotros</button>
            </div>
        </>
    )
}

export default Conocenos