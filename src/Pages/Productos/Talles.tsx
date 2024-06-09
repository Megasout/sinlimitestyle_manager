import { useState } from "react"
import getFromTable from "../../Models/get"
import { useLoaderData } from "react-router-dom"
import TitleWithSearch from "../../Components/TitleWithSearch"
import { filterbyName } from "../../Helpers"
import TalleElement from "../../Components/Productos/TalleElement"

export async function loader() {
    const [categorias, talles] = await Promise.all([
        getFromTable('/get/categorias'),
        getFromTable('/get/talles')
    ])

    return { categorias: categorias, talles: talles }
}

function Talles() {
    const { categorias, talles } = useLoaderData() as any

    const [filter, setFilter] = useState('')

    return (
        <div className="categorias">
            <TitleWithSearch
                filter={filter}
                placeHolder="Buscar por categoria..."
                onChange={(value) => setFilter(value)}
                title="Talles" />

            <div className="get">
                <table>
                    <thead>
                        <tr className="title">
                            <th>
                                <p>Categoria</p>
                            </th>
                            <th>
                                <p>Talles</p>
                            </th>
                            <th>
                                <p>Acciones</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterbyName(categorias, filter).map((categoria) =>
                                <TalleElement
                                    key={categoria.id}
                                    idCategoria={categoria.id}
                                    categoria={categoria.nombre}
                                    talles={(talles.filter((object: any) => object.id_categoria == categoria.id)) as Array<any>} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Talles