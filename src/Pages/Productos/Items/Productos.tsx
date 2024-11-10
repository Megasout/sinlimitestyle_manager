import {useState } from "react"
import TitleWithSearch from "../../../Components/TitleWithSearch"
import getFromTable from "../../../Models/get"
import { useLoaderData, useNavigate } from "react-router-dom"
import { filterbyCategoryId, filterbyName } from "../../../Helpers"

import "../../../Styles/prendas.scss"

export async function loader({params}: any) {
    const type: string = params.TYPE

    if (type != 'Prendas' && type != 'Accesorios')
        throw new Response('', {
            status: 404
        })

    const [categorias, productos, miniaturas] = await Promise.all([
        getFromTable(`/get/categorias/bytype/${type == 'Prendas' ? 'prenda' : 'accesorio'}`),
        getFromTable(`/get/${type[0].toLowerCase() + type.slice(1)}`),
        getFromTable(`/get/miniaturas/${type[0].toLowerCase() + type.slice(1)}`)
    ])

    return { categorias, productos, miniaturas, type }
}

function Productos() {
    const { categorias, productos, miniaturas, type } = useLoaderData() as any

    const [filter, setFileter] = useState("")
    const [categoriaSelect, setCategoria] = useState(-1)
    const navigator = useNavigate()

    return (
        <div className="prendas">
            <TitleWithSearch
                filter={filter}
                onChange={(value) => setFileter(value)}
                title={type}/>

            <div className="filtro">
                <h3>Filtro</h3>
                <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoria(parseInt(e.target.value))}>
                    <option value={-1}>---Sin Filtro---</option>
                    {categorias.map((categoria: any) =>
                        <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>)}
                    <option value={-2}>Sin Categoria</option>
                </select>
            </div>

            <div className="list">
                <div className="add" onClick={() => navigator('./add')}>
                    <i className="fa-solid fa-plus"></i>
                </div>

                {
                    filterbyName(categoriaSelect !== -2 ?
                        categoriaSelect == -1 ? productos :
                            filterbyCategoryId(productos, categoriaSelect) :
                            productos.filter((producto: any) => producto.id_categoria == undefined), filter).map((producto: any) =>
                            <div key={producto.id}>
                                <div
                                    className="block"
                                    onClick={() => navigator(`./${producto.id}/edit`)}>
                                    {buscarPosicionPorIdProducto(miniaturas, producto.id) === -1 ?
                                        <div>
                                            <i className="fa-regular fa-image"></i>
                                            <p style={{userSelect: "none"}}>Sin Miniatura</p>
                                        </div> :
                                        <img src={miniaturas[buscarPosicionPorIdProducto(miniaturas, producto.id)].url}></img>}
                                </div>
                                <p style={{userSelect: "none"}} className="title">{producto.nombre}</p>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

function buscarPosicionPorIdProducto(miniaturas: any, id_producto: any): number {
    return miniaturas.findIndex((miniatura: any) => miniatura.id_producto === id_producto);
}

export default Productos