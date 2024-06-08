import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import TitleWithSearch from "../../Components/TitleWithSearch"
import Loader from "../../Components/Loader"
import "../../Styles/categorias.scss"
import { useLoaderData, useNavigate } from "react-router-dom"
import { postToTable } from "../../Models/post"
import getFromTable from "../../Models/get"
import CategoriaElement from "../../Components/CategoriaElement"
import { filterbyName } from "../../Helpers"

export async function loader() {
    const result = await getFromTable('/get/categorias')

    return result
}

function Categorias() {
    const categorias = useLoaderData() as Array<any>

    const [loader, setLoader] = useState(false)
    const [filter, setFilter] = useState('')
    const [error, setError] = useState(false)

    useEffect(() => {
        setError(false)
        setLoader(false)
    }, [categorias])

    return (
        <div className="categorias">
            {
                error &&
                <div className="error">
                    <h2>No se pueden dejar campos vacios</h2>
                </div>
            }

            <TitleWithSearch
                filter={filter}
                onChange={(value) => setFilter(value)}
                title="Categorias" />

            <div className="get">
                <table>
                    <thead>
                        <tr className="title">
                            <th>
                                <p>Nombre</p>
                            </th>
                            <th>
                                <p>Tipo</p>
                            </th>
                            <th>
                                <p>Acciones</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <Line />
                        <AddCategoria setError={setError} setLoader={setLoader} />
                        <Line />
                        {filterbyName(categorias, filter).map((categoria) =>
                            <CategoriaElement
                                key={categoria.id}
                                id={categoria.id}
                                nombre={categoria.nombre}
                                tipo={categoria.tipo}
                                setError={setError}
                                setLoader={setLoader} />)}
                    </tbody>
                </table>
            </div>

            <Loader loader={loader} />
        </div>
    )
}

export default Categorias

function Line() {
    return (
        <tr>
            <td>
                <div className="line"></div>
            </td>
            <td>
                <div className="line"></div>
            </td>
            <td>
                <div className="line"></div>
            </td>
        </tr>
    )
}

type AddCategoriaType = {
    setError: (value: boolean) => void,
    setLoader: (value: boolean) => void
}

function AddCategoria(props: AddCategoriaType) {
    const { setError, setLoader } = props

    const navigator = useNavigate()
    const [nombre, setNombre] = useState('')
    const [tipo, setTipo] = useState('Ropa')

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNombre(e.target.value)
    }

    const handleTipoChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setTipo(e.target.value)
    }

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //Error Nombre Nesesario
        if (nombre == "")
            return setError(true)

        setLoader(true)

        const data = {
            nombre: nombre,
            tipo: tipo
        }

        await postToTable(data, "/post/categoria")

        return navigator('../Categorias')
    }

    return (
        <tr className="selection">
            <td>
                <center>
                    <input
                        onChange={handleNameChange}
                        value={nombre}
                        type="text"
                        placeholder="Nombre de la categoria..." />
                </center>
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
                    <button className="add" type="submit">Agregar</button>
                </form>
            </td>
        </tr>
    )
}