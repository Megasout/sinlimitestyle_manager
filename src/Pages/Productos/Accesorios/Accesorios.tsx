import { useLoaderData, useNavigate } from "react-router-dom"
import getFromTable from "../../../Models/get"
import { useState } from "react"
import TitleWithSearch from "../../../Components/TitleWithSearch"
import { filterbyCategoryId, filterbyName } from "../../../Helpers"

export async function loader() {
    const [categorias, accesorios, miniaturas] = await Promise.all([
        getFromTable('/get/categorias/bytype/Accesorio'),
        getFromTable('/get/accesorios'),
        getFromTable('/get/miniaturas/accesorios')
    ])

    return { categorias: categorias, accesorios: accesorios, miniaturas: miniaturas }
}

function Accesorios() {
    const { categorias, accesorios, miniaturas } = useLoaderData() as any

    const [filter, setFileter] = useState("")
    const [categoriaSelect, setCategoria] = useState(-1)
    const navigator = useNavigate()

    return (
        <div className="prendas">
            <TitleWithSearch
                filter={filter}
                onChange={(value) => setFileter(value)}
                title="Accesorios" />

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
                        categoriaSelect == -1 ? accesorios :
                            filterbyCategoryId(accesorios, categoriaSelect) :
                            accesorios.filter((accesorio: any) => accesorio.id_categoria == undefined), filter).map((accesorio: any) =>
                            <div key={accesorio.id}>
                                <div
                                    className="block"
                                    onClick={() => navigator(`./${accesorio.id}/edit`)}>
                                    {buscarPosicionPorIdAccesorio(miniaturas, accesorio.id) === -1 ?
                                        <div>
                                            <i className="fa-regular fa-image"></i>
                                            <p>Sin Miniatura</p>
                                        </div> :
                                        <img src={miniaturas[buscarPosicionPorIdAccesorio(miniaturas, accesorio.id)].url}></img>}
                                </div>
                                <p className="title">{accesorio.nombre}</p>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

function buscarPosicionPorIdAccesorio(miniaturas: any, id_accesorio: any): number {
    return miniaturas.findIndex((miniatura: any) => miniatura.id_accesorio === id_accesorio);
}

export default Accesorios