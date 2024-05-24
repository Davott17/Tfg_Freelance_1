import pesa from '../assets/Profesional.jpg'
import gimnasio from '../assets/gym.jpeg'
import latido_corazon from '../assets/latido-del-corazon.png'
import Proteinas from '../assets/proteina.avif'


import '../CSS/galeria.css'


function Galeria() {
    const imagenes = [
        { imagen: pesa, nombre: "Juan", profesion: "nutricionista" },
        { imagen: gimnasio, nombre: "alberto", profesion: "nutricionista" },
        { imagen: latido_corazon, nombre: "X", profesion: "nutricionista" },
        { imagen: Proteinas, nombre: "X", profesion: "nutricionista" },
        { imagen: gimnasio, nombre: "X", profesion: "nutricionista" },
        { imagen: pesa, nombre: "juan", profesion: "nutricionista" },
        { imagen: latido_corazon, nombre: "X", profesion: "nutricionista" },
    ]
    return (
        <>
            <div className='contenedor_galeria'>
                <h2>Tabajos destacados </h2>
                <div className='contenedor_imagenes_galeria'>
                    <article className='articulo_grande'>
                        <img className='imagen_grande' src={imagenes[0].imagen} alt='Imagen principal' />
                        <div>
                            <article>
                                <p>{imagenes[0].nombre}</p>
                                <p>{imagenes[0].profesion}</p>
                            </article>
                            <button>Descubrir más ></button>
                        </div>
                    </article>


                    <div className='contenedor_imagenes_pequenas'>
                        {imagenes.slice(1).map((f, index) => (
                            <article className='articulo_pequeno' >
                                <img className='imagen_pequena' key={index} src={f.imagen} alt='x' />
                                <div>
                                    <article className='column'>
                                        <p>{f.nombre}</p>
                                        <p>{f.profesion}</p>
                                    </article>
                                    <button className='button_info'>Descubrir más ></button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}


export default Galeria

