import {useState } from "react"
import TitleWithSearch from "../../../Components/TitleWithSearch"
import getFromTable from "../../../Models/get"
import { useLoaderData, useNavigate } from "react-router-dom"
import { filterbyCategoryId, filterbyName } from "../../../Helpers"

import "../../../Styles/prendas.scss"

export async function loader() {
    const [categorias, prendas, miniaturas] = await Promise.all([
        getFromTable('/get/categorias/bytype/Ropa'),
        getFromTable('/get/prendas'),
        getFromTable('/get/miniaturas/prendas')
    ])

    return { categorias: categorias, prendas: prendas, miniaturas: miniaturas }
}

function Prendas() {
    const { categorias, prendas, miniaturas } = useLoaderData() as any

    const [filter, setFileter] = useState("")
    const [categoriaSelect, setCategoria] = useState(-1)
    const navigator = useNavigate()

    return (
        <div className="prendas">
            <TitleWithSearch
                filter={filter}
                onChange={(value) => setFileter(value)}
                title="Prendas" />

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
                        categoriaSelect == -1 ? prendas :
                            filterbyCategoryId(prendas, categoriaSelect) :
                        prendas.filter((prenda: any) => prenda.id_categoria == undefined), filter).map((prenda: any) =>
                            <div key={prenda.id}>
                                <div
                                    className="block"
                                    onClick={() => navigator(`./${prenda.id}/edit`)}>
                                    {buscarPosicionPorIdProducto(miniaturas, prenda.id) === -1 ?
                                        <div>
                                            <i className="fa-regular fa-image"></i>
                                            <p>Sin Miniatura</p>
                                        </div> :
                                        <img src={miniaturas[buscarPosicionPorIdProducto(miniaturas, prenda.id)].url}></img>}
                                </div>
                                <p className="title">{prenda.nombre}</p>
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

export default Prendas