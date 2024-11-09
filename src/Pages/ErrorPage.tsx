import { useRouteError } from "react-router-dom"
import "../Styles/error.scss"

function ErrorPage() {
    const error = useRouteError() as any
    const message: string = error ? error?.message == 'Failed to fetch'
        ? 'Error de conexion con el servidor' : error?.message : 'Algo salio mal'

    const status = !error || error?.message == 'Failed to fetch' ? 500 : error.status

    const text = status == 404 ? 'Pagina no encontrada'
        : message == '' || typeof message == "undefined" ? error?.statusText : message 

    return (
        <div className="error">
            <h1>Error {status}</h1>
            <h3>{text}</h3>
        </div>
    )
}

export default ErrorPage