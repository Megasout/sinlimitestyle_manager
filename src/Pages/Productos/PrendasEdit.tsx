import { ChangeEvent, useState } from "react"
import { PrendaType } from "./PrendasAdd"
import getFromTable from "../../Models/get"
import { useLoaderData, useNavigate } from "react-router-dom"
import DropZoneOneImage from "../../Components/DropZoneOneImage"

export async function loader() {
    const [categorias] = await Promise.all([
        getFromTable('/get/categorias/bytype/Ropa'),
    ])

    return { categorias: categorias }
}

function PrendasEdit() {
    const { categorias } = useLoaderData() as any
    const navigator = useNavigate()

    const [file, setFile] = useState<File>()
    const [prenda, setPrenda] = useState<PrendaType>({
        name: '',
        material: '',
        category: -1,
        stock: 0,
        price: 0,
        off: 0
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setPrenda(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="prendas_add">
            <div className="titleWidthSearch">
                <h1>Editar Prenda</h1>
            </div>
            <div className="content edit">
                <form
                    method="POST"
                    encType="multipart/form-data"
                    className="data">
                    <label>Miniatura (Arrastre o busque una imagen)</label>
                    <DropZoneOneImage setFile={setFile} file={file} />
                    <label>Nombre</label>
                    <input
                        name="name"
                        value={prenda?.name}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Nombre de la prenda..."
                        required
                    />
                    <label>Material</label>
                    <input
                        name="material"
                        value={prenda.material}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Materiales..."
                        required />
                    <label>Stock</label>
                    <input
                        name="stock"
                        min={0}
                        value={prenda.stock}
                        onChange={handleInputChange}
                        type="number"
                        placeholder="Cantidad en stock"
                        required />
                    <label>Precio</label>
                    <input
                        name="price"
                        min={0}
                        value={prenda.price}
                        onChange={handleInputChange}
                        type="number"
                        placeholder="Precio completo"
                        required />
                    <label>Descuento %</label>
                    <input
                        name="off"
                        min={0}
                        value={prenda.off}
                        onChange={handleInputChange}
                        type="number"
                        placeholder="Descuento %" />
                    <button
                        onClick={() => navigator('./talles')}
                        className="buttonB">Seleccionar Categoria y Talles</button>
                    <button
                        onClick={() => navigator('./colores')}
                        className="buttonC">Seleccionar Colores</button>
                    <button
                        onClick={() => navigator('./imagenes')}
                        className="buttonD">Editar Imagenes</button>
                    <button className="buttonA" type="submit">Guardar</button>
                </form>
            </div>
        </div>
    )
}

export default PrendasEdit