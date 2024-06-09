import { useLoaderData, useNavigate } from "react-router-dom"
import getFromTable from "../../Models/get"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { postToTable } from "../../Models/post"
import TalleEditElement from "../../Components/Productos/TalleEditElement"
import Loader from "../../Components/Loader"

export async function loader({ params }: any) {
    const id = params.ID

    const [categoria, talles] = await Promise.all([
        getFromTable(`/get/categoria/${id}`),
        getFromTable(`/get/talles/categoria/${id}`)
    ])

    return { categoria: categoria[0], talles: talles }
}

function TallesEdit() {
    const { categoria, talles } = useLoaderData() as any

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setLoader(false)
        setError(false)
    }, [talles])

    return (
        <div className="categorias">
            {
                error &&
                <div className="error">
                    <h2>No se pueden dejar campos vacios</h2>
                </div>
            }

            <div className="heading">
                <h1>{categoria.nombre}</h1>
            </div>

            <div className="get">
                <table>
                    <thead>
                        <tr className="title">
                            <th>
                                <p>Talle</p>
                            </th>
                            <th>
                                <p>Acciones</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <Line />
                        <AddTalle
                            route={`../Talles/${categoria.id}/edit`}
                            idCategoria={categoria.id}
                            setError={setError}
                            setLoader={setLoader} />
                        <Line />
                        {talles.map((talle: any) =>
                            <TalleEditElement
                                key={talle.id}
                                id={talle.id}
                                idCategoria={categoria.id}
                                talle={talle.talle}
                                setLoader={setLoader} />)}
                    </tbody>
                </table>
            </div>
            
            <Loader loader={loader} />
        </div >
    )
}

export default TallesEdit

function Line() {
    return (
        <tr>
            <td>
                <div className="line"></div>
            </td>
            <td>
                <div className="line"></div>
            </td>
        </tr>
    )
}

type AddTalleType = {
    setError: (value: boolean) => void,
    setLoader: (value: boolean) => void,
    idCategoria: number,
    route: string
}

function AddTalle(props: AddTalleType) {
    const { route, idCategoria, setError, setLoader } = props

    const navigator = useNavigate()
    const [talle, setTalle] = useState('')

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTalle(e.target.value.toUpperCase())
    }

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (talle == "")
            return setError(true)

        setLoader(true)

        const data = {
            talle: talle,
            id_categoria: idCategoria
        }

        await postToTable(data, "/post/talle")
        setTalle('')
        return navigator(route)
    }

    return (
        <tr className="selection">
            <td>
                <center>
                    <input
                        onChange={handleNameChange}
                        value={talle}
                        type="text"
                        placeholder="Ingrese el talle..." />
                </center>
            </td>
            <td className="actions">
                <form method="POST" onSubmit={handleOnSubmit}>
                    <button className="add blue" type="submit">Agregar</button>
                </form>
            </td>
        </tr>
    )
}