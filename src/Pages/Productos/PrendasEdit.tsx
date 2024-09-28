import { ChangeEvent, FormEvent, useState } from "react"
import getFromTable from "../../Models/get"
import { useLoaderData, useNavigate } from "react-router-dom"
import DropZoneOneImage from "../../Components/DropZoneOneImage"
import { putToTableWithFormData } from "../../Models/put"

export async function loader({ params }: any) {
    const id = params.ID

    const [prenda, miniatura] = await Promise.all([
        getFromTable(`/get/prenda/${id}`),
        getFromTable(`/get/miniatura/prenda/${id}`)
    ])

    return { prenda: prenda[0], miniatura: miniatura[0] }
}

function PrendasEdit() {
    const { prenda, miniatura } = useLoaderData() as any
    const navigator = useNavigate()

    const [file, setFile] = useState<File>()
    const [url, setUrl] = useState<string>(miniatura ? miniatura.url : '')

    const [prendaData, setPrenda] = useState<PrendaType>({
        name: prenda.nombre,
        material: prenda.material,
        off: prenda.descuento,
        price: prenda.precio,
        stock: prenda.stock
    } as PrendaType)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setPrenda(prev => ({ ...prev, [name]: value }))
    }

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData()

        if (url == '' && file)
            formData.append('file', file)

        formData.append('nombre', prendaData.name)
        formData.append('material', prendaData.material)
        formData.append('stock', prendaData.stock.toString())
        formData.append('precio', prendaData.price.toString())
        formData.append('descuento', prendaData.off.toString())

        await putToTableWithFormData(formData, `/put/prenda/${prenda.id}`)
    }

    console.log(miniatura)

    return (
        <div className="prendas_add">
            <div className="titleWidthSearch">
                <h1>Editar Prenda</h1>
            </div>
            <div className="content edit">
                <form
                    method="POST"
                    encType="multipart/form-data"
                    onSubmit={handleOnSubmit}
                    className="data">
                    <label>Miniatura (Arrastre o busque una imagen)</label>
                    <DropZoneOneImage className="p_dropzone" withOutText setFile={setFile} setURL={setUrl} file={file} url={url} />
                    <label>Nombre</label>
                    <input
                        name="name"
                        value={prendaData.name}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Nombre de la prenda..."
                        required
                    />
                    <label>Material</label>
                    <input
                        name="material"
                        value={prendaData.material}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Materiales..."
                        required />
                    <label>Stock</label>
                    <input
                        name="stock"
                        min={0}
                        value={prendaData.stock}
                        onChange={handleInputChange}
                        type="number"
                        placeholder="Cantidad en stock"
                        required />
                    <label>Precio</label>
                    <input
                        name="price"
                        min={0}
                        value={prendaData.price}
                        onChange={handleInputChange}
                        type="number"
                        placeholder="Precio completo"
                        required />
                    <label>Descuento %</label>
                    <input
                        name="off"
                        min={0}
                        value={prendaData.off}
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

type PrendaType = {
    name: string,
    material: string,
    stock: number,
    price: number,
    off: number
}