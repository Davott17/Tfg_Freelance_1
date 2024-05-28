import Panel_lateral from "../widgets/panel_lateral"
import Panel_central from "../widgets/panel_central"
import Header_log from "../widgets/header_logueado"


function areaCliente() {
    return (
        <>
            <div className="flex">
                <Header_log />
                <Panel_lateral />
                <Panel_central />
            </div>
        </>
    )
}

export default areaCliente