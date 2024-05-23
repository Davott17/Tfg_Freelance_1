import { Route, Router } from "react-router-dom"
import Header from '../widgets/header'
import Fondo from '../widgets/fondo'
import Opciones from '../widgets/opcion'
import Conocenos from "../widgets/conocenos"
import Galeria from "../widgets/galeria"
function Inicio() {
    return (

        <>
            <div className="body_background_naranja">
                <Header />
                <Fondo />
                <Opciones />
                <Galeria />
                <Conocenos />
            </div>
        </>
    )
}
export default Inicio