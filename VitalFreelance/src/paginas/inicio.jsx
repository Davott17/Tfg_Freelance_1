import { Route, Router } from "react-router-dom"
import Header from '../widgets/header'
import Fondo from '../widgets/fondo'
import Opciones from '../widgets/opcion'
import Conocenos from "../widgets/conocenos"

function Inicio() {
    return (

        <>
            <Header />
            <Fondo />
            <Opciones />
            <Conocenos />
        </>
    )
}
 export default Inicio