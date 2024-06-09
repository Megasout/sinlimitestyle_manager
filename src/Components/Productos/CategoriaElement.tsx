import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import deleteFromTable from "../../Models/delete"
import { Form, redirect, useNavigate } from "react-router-dom"
import { putToTable } from "../../Models/put"

export async function action({ params }: any) {
    const id = params.ID
    await deleteFromTable(`/delete/categoria/${id}`)
    return redirect('../Categorias')
}

type CategoriaElementType = {
    id: number,
    nombre: string,
    tipo: string,
    setError: (value: boolean) => void,
    setLoader: (value: boolean) => void,
    isEditing: boolean,
    setIsEditing: (value: boolean) => void
}

function CategoriaElement(props: CategoriaElementType) {
    const { id, nombre, tipo, setError, setLoader, isEditing, setIsEditing } = props

    const [edit, setEdit] = useState(false)

    useEffect(() => {
        setIsEditing(edit)
    }, [edit])

    const handleEdit = () => {
        if (!isEditing) {
            setEdit(true)
            setIsEditing(true)
        }
    }

    return (
        !edit ?
            <tr className="item">
                <td>
                    <p>{nombre}</p>
                </td>
                <td>
                    <p>{tipo}</p>
                </td>
                <td className="actions">
                    <Form
                        method="POST"
                        action={`../Categorias/${id}/delete`}
                        onSubmit={(e) => {
                            if (!confirm(`Quiere eliminar la categoria: ${nombre}-${tipo}`))
                                return e.preventDefault()
                            setLoader(true)
                        }}>
                        <button
                            className="blue"
                            type="button"
                            onClick={handleEdit}>Editar</button>
                        <button type="submit">Eliminar</button>
                    </Form>
                </td>
            </tr> :
            <Edit
                setEdit={setEdit}
                id={id}
                nombre={nombre}
                tipo={tipo}
                setError={setError}
                setLoader={setLoader} />
    )
}

export default CategoriaElement

type EditType = {
    id: number,
    nombre: string,
    tipo: string,
    setEdit: (value: boolean) => void,
    setError: (value: boolean) => void,
    setLoader: (value: boolean) => void
}

function Edit(props: EditType) {
    const { id, setEdit, setError, setLoader } = props

    const [nombre, setNombre] = useState(props.nombre)
    const [tipo, setTipo] = useState(props.tipo)
    const navigator = useNavigate()

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNombre(e.target.value)
    }

    const handleTipoChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setTipo(e.target.value)
    }

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log(nombre)

        if(nombre == "")
            return setError(true)

        setLoader(true)

        const data = {
            nombre: nombre,
            tipo: tipo
        }

        await putToTable(data, `/put/categoria/${id}`)
        setEdit(false)
        return navigator('../Categorias')
    }

    const handleCancel = () => {
        setEdit(false)
    }

    return (
        <tr className="item">
            <td>
                <div className="edit">
                    <input
                        type="text"
                        placeholder="Nombre de la categoria..."
                        value={nombre}
                        onChange={handleNameChange} />
                </div>
            </td>
            <td>
                <center>
                    <select value={tipo} onChange={handleTipoChange}>
                        <option value={"Ropa"}>Ropa</option>
                        <option value={"Accesorio"}>Accesorio</option>
                    </select>
                </center>
            </td>
            <td className="actions">
                <form method="POST" onSubmit={handleOnSubmit}>
                    <button type="button" onClick={handleCancel}>Cancelar</button>
                    <button className="blue" type="submit">Guardar</button>
                </form>
            </td>
        </tr>
    )
}