import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom"
import TitleWithBackButton from "../../Components/TitleWithBackButton"
import getFromTable from "../../Models/get"
import { FormEvent, useEffect, useState } from "react"
import Loader from "../../Components/Loader"
import TableLines from "../../Components/TableLines"
import { postToTable } from "../../Models/post"
import deleteFromTable from "../../Models/delete"

export async function loader({ params }: any) {
    const id = params.ID

    const [colores, coloresPrenda] = await Promise.all([
        getFromTable(`/get/colores`),
        getFromTable(`/get/colores/prenda/${id}`)
    ])

    return { prendaId: id, colores: colores, coloresPrenda: coloresPrenda }
}

export async function action({ params }: any) {
    const idC = params.COLORID
    const idP = params.ID

    await deleteFromTable(`/delete/color/${idC}/prenda/${idP}`)

    return redirect(`../Prendas/${idP}/edit/colores`)
}

function PrendaColores() {
    const { prendaId, colores, coloresPrenda } = useLoaderData() as any
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setLoader(false)
    }, [coloresPrenda])

    return (
        <div className="categorias">
            <TitleWithBackButton direction={`../Prendas/${prendaId}/edit`} title="Editar Colores" />
            <div className="get">
                <table>
                    <thead>
                        <tr className="title">
                            <th>
                                <p>Nombre</p>
                            </th>
                            <th>
                                <p>Color</p>
                            </th>
                            <th>
                                <p>Acciones</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableLines lines={3} />
                        <AddColor
                            colors={colores.filter((col: any) =>
                                !coloresPrenda.some((pre: any) => col.id === pre.id))}
                            prendaId={prendaId}
                            setLoader={setLoader}
                            loader={loader} />
                        <TableLines lines={3} />
                        <ShowColors
                            colors={coloresPrenda}
                            prendaId={prendaId}
                            setLoader={setLoader} />
                    </tbody>
                </table>
            </div>

            <Loader loader={loader} />
        </div>
    )
}

export default PrendaColores

type AddColorType = {
    colors: Array<any>,
    loader: boolean,
    setLoader: (value: boolean) => void,
    prendaId: number
}

function AddColor(prop: AddColorType) {
    const { colors, setLoader, loader, prendaId } = prop

    const [colorSelect, setColor] = useState<number>(colors.length != 0 ? colors[0].id : -1)
    const navigator = useNavigate()

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setColor(-1)
        setLoader(true)

        const data = {
            id_color: colorSelect,
            id_producto: prendaId
        }

        await postToTable(data, '/post/color/prenda')
        return navigator(`../Prendas/${prendaId}/edit/colores`)
    }

    useEffect(() => {
        if (!loader)
            setColor(colors.length != 0 ? colors[0].id : -1)
    }, [colors])

    return (
        <tr className="selection">
            <td>
                <center>
                    <select
                        value={colorSelect}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setColor(parseInt(e.target.value))}
                        disabled={colors.length == 0}>
                        {colors.map((color: any) =>
                            <option key={color.id} value={color.id}>{color.nombre}</option>)}
                    </select>
                </center>
            </td>
            <td>
                <div className="color">
                    {colorSelect != -1 &&
                        <div style={{
                            backgroundColor: colors.length != 0 ?
                                colors.find((color: any) => color.id === colorSelect).hex : 'whitesmoke'
                        }}></div>
                    }
                </div>
            </td>
            <td className="actions">
                <form
                    onSubmit={handleOnSubmit}
                    method="POST">
                    <button
                        disabled={colors.length == 0}
                        className="add blue"
                        type="submit">Agregar</button>
                </form>
            </td>
        </tr>
    )
}

type ShowColorsType = {
    colors: Array<any>,
    prendaId: number,
    setLoader: (value: boolean) => void
}

function ShowColors(prop: ShowColorsType) {
    const { colors, prendaId, setLoader } = prop

    return colors.map((color: any) =>
        <tr key={color.id} className="item">
            <td>
                <p>{color.nombre}</p>
            </td>
            <td>
                <div className="color">
                    <div style={{ backgroundColor: color.hex }}></div>
                </div>
            </td>
            <td className="actions">
                <Form
                    action={`../Prendas/${prendaId}/edit/colores/${color.id}/delete`}
                    method="POST"
                    onSubmit={(e) => {
                        if (!confirm(`Quiere eliminar el Color: ${color.nombre}?`))
                            return e.preventDefault()
                        setLoader(true)
                    }}>
                    <button
                        className="add"
                        onClick={() => { }}
                        type="submit">Eliminar</button>
                </Form>
            </td>
        </tr>)
}
