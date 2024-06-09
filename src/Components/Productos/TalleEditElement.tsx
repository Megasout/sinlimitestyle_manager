import { Form, redirect } from "react-router-dom"
import deleteFromTable from "../../Models/delete"

export async function action({ params }: any) {
    console.log('aaa')
    const id = params.ID
    const idCategoria = params.IDCategoria
    await deleteFromTable(`/delete/talle/${id}`)
    return redirect(`../talles/${idCategoria}/edit`)
}

type TalleEditType = {
    id: number,
    idCategoria: number,
    talle: string,
    setLoader: (value: boolean) => void
}

function TalleEditElement(props: TalleEditType) {
    const { id, idCategoria, talle, setLoader } = props

    return (
        <tr className="item">
            <td>
                <p>{talle}</p>
            </td>
            <td className="actions">
                <Form
                    method="POST"
                    action={`../Talles/${idCategoria}/${id}/delete`}
                    onSubmit={(e) => {
                        if (!confirm(`Quiere eliminar el talle: ${talle}`))
                            return e.preventDefault()
                        setLoader(true)
                    }}>
                    <button
                        className="add"
                        type="submit">Eliminar</button>
                </Form>
            </td>
        </tr>
    )
}

export default TalleEditElement