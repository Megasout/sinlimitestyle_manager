import { useLoaderData } from "react-router-dom"
import getFromTable from "../../Models/get"

export async function loader({ params }: any) {
    const id = params.ID

    const [categorias, talles, tallesProducto] = await Promise.all([
        getFromTable('/get/categorias/bytype/Ropa'),
        getFromTable(`/get/talles`),
        getFromTable(`/get/talles/producto/${id}`)
    ])

    return { categorias: categorias, talles: talles, tallesProducto: tallesProducto }
}
function PrendaTalle() {
    const { categorias, talles, tallesProducto } = useLoaderData() as any

    return (
        <div className="categorias">
            <div className="titleWidthSearch">
                <h1>Editar Talles</h1>
            </div>
            <select
                className="select_categoria"
                name="category">
                <option value={-1}>---Sin Seleccionar---</option>
                {categorias.map((categoria: any) =>
                    <option value={categoria.id}>{categoria.nombre}</option>)}
            </select>
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
                        <tr className="selection">
                            <td>
                                <center>
                                    <input
                                        type="text"

                                    ></input>
                                </center>
                            </td>
                            <td className="actions">
                                <form
                                    method="POST">
                                    <button
                                        className="add blue"
                                        onClick={() => { }}
                                        type="button">Agregar</button>
                                </form>
                            </td>
                        </tr>
                        <Line />
                        <tr className="item">
                            <td>
                                <p>XL</p>
                            </td>
                            <td className="actions">
                                <form
                                    method="POST">
                                    <button
                                        className="add"
                                        onClick={() => { }}
                                        type="button">Eliminar</button>
                                </form>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

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

export default PrendaTalle