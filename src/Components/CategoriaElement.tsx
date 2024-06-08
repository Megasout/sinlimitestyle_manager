import { useState } from "react"

type CategoriaElementType = {
    id: number,
    nombre: string,
    tipo: string,
    setError: (value: boolean) => void,
    setLoader: (value: boolean) => void
}

function CategoriaElement(props: CategoriaElementType) {
    const {id, nombre, tipo, setError, setLoader} = props

    const [edit, setEdit] = useState(false)

    return (
        <tr className="item">
            <td>
                <p>{nombre}</p>
            </td>
            <td>
                <p>{tipo}</p>
            </td>
            <td className="actions">
                <form>
                    <button type="submit">Actualizar</button>
                    <button type="submit">Eliminar</button>
                </form>
            </td>
        </tr>
    )
}

export default CategoriaElement