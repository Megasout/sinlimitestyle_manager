import { Form, redirect } from "react-router-dom"
import deleteFromTable from "../../Models/delete"

export async function action({ params }: any) {
    const id = params.ID
    await deleteFromTable(`/delete/color/${id}`)
    return redirect('../Colores')
}

type ColorType = {
    id: number
    nombre: string
    hex: string
    setLoader: (value: boolean) => void
}

function ColorElement(props: ColorType) {
    const { hex, nombre, id, setLoader } = props

    return (
        <tr>
            <td>
                <p>{nombre}</p>
            </td>
            <td>
                <p>{hex}</p>
            </td>
            <td>
                <div className="color">
                    <div style={{ backgroundColor: hex }} />
                </div>
            </td>
            <td>
                <Form
                    method="post"
                    className="link"
                    action={`../Colores/${id}/delete`}
                    onSubmit={(e) => {
                        if (!confirm(`Quiere eliminar el color: ${nombre}-${hex}`))
                            return e.preventDefault()
                        setLoader(true)
                    }}>
                    <button type="submit">Eliminar</button>
                </Form>
            </td>
        </tr>
    )
}

export default ColorElement