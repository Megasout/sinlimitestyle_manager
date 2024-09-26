import { useState } from "react"
import TitleWithSearch from "../../Components/TitleWithSearch"
import Loader from "../../Components/Loader"
import getFromTable from "../../Models/get"
import { useLoaderData, useNavigate } from "react-router-dom"
import { filterbyName } from "../../Helpers"

import "../../Styles/prendas.scss"

export async function loader() {
    const [categorias, prendas] = await Promise.all([
        getFromTable('/get/categorias/bytype/Ropa'),
        getFromTable('/get/prendas')
    ])

    return { categorias: categorias, prendas: prendas }
}

function Prendas() {
    const { categorias, prendas } = useLoaderData() as any

    const [filter, setFileter] = useState("")
    const [isLoader, setLoader] = useState(false)
    const [categoriaSelect, setCategoria] = useState("")
    const navigator = useNavigate()

    return (
        <div className="prendas">
            <TitleWithSearch
                filter={filter}
                onChange={(value) => setFileter(value)}
                title="Prendas" />

            <div className="filtro">
                <h3>Filtro</h3>
                <select>
                    <option value={-1}>---Sin Filtro---</option>
                    {categorias.map((categoria: any) =>
                        <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>)}
                </select>
            </div>

            <div className="list">
                <div className="add" onClick={() => navigator('./add')}>
                    <i className="fa-solid fa-plus"></i>
                </div>

                {prendas.map((prenda: any) => 
                    <div className="block"></div>)}
            </div>

            <Loader loader={isLoader} />
        </div>
    )
}

export default Prendas