import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import getFromTable from "../../../Models/get"
import { useLoaderData, useNavigate } from "react-router-dom"
import DropZoneOneImage from "../../../Components/DropZoneOneImage"
import { putToTableWithFormData } from "../../../Models/put"
import TitleWithBackButton from "../../../Components/TitleWithBackButton"
import Loader from "../../../Components/Loader"

export async function loader({ params }: any) {
    const id = params.ID

    const [accesorio, miniatura] = await Promise.all([
        getFromTable(`/get/accesorio/${id}`),
        getFromTable(`/get/miniatura/accesorio/${id}`)
    ])

    return { accesorio: accesorio[0], miniatura: miniatura[0] }
}

function AccesoriosEdit() {
    const { accesorio, miniatura } = useLoaderData() as any
    const navigator = useNavigate()
    const [loader, setLoader] = useState(false)

    const [file, setFile] = useState<File>()
    const [url, setUrl] = useState<string>(miniatura ? miniatura.url : '')

    const [accesorioData, setAccesorio] = useState<AccesorioType>({
        name: accesorio.nombre,
        material: accesorio.material,
        off: accesorio.descuento,
        price: accesorio.precio,
        stock: accesorio.stock
    } as AccesorioType)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setAccesorio(prev => ({ ...prev, [name]: value }))
    }

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoader(true)

        const formData = new FormData()

        if (url == '' && file)
            formData.append('file', file)

        formData.append('nombre', accesorioData.name)
        formData.append('material', accesorioData.material)
        formData.append('stock', accesorioData.stock.toString())
        formData.append('precio', accesorioData.price.toString())
        formData.append('descuento', accesorioData.off.toString())

        await putToTableWithFormData(formData, `/put/accesorio/${accesorio.id}`)
        return navigator(`../Accesorios/${accesorio.id}/edit`)
    }

    useEffect(() => {
        setLoader(false)
    }, [accesorio])

    return (
        <div className="prendas_add">
            <TitleWithBackButton direction="../Accesorios" title="Editar Accesorio" />
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
                        value={accesorioData.name}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Nombre de la prenda..."
                        required
                    />
                    <label>Material</label>
                    <input
                        name="material"
                        value={accesorioData.material}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Materiales..."
                        required />
                    <label>Stock</label>
                    <input
                        name="stock"
                        min={0}
                        value={accesorioData.stock}
                        onChange={handleInputChange}
                        type="number"
                        placeholder="Cantidad en stock"
                        required />
                    <label>Precio</label>
                    <input
                        name="price"
                        min={0}
                        value={accesorioData.price}
                        onChange={handleInputChange}
                        type="number"
                        placeholder="Precio completo"
                        required />
                    <label>Descuento %</label>
                    <input
                        name="off"
                        min={0}
                        value={accesorioData.off}
                        onChange={handleInputChange}
                        type="number"
                        placeholder="Descuento %" />
                    <button
                        type="button"
                        onClick={() => navigator('./talles')}
                        className="buttonB">Seleccionar Categoria y Talles</button>
                    <button
                        type="button"
                        onClick={() => navigator('./colores')}
                        className="buttonC">Seleccionar Colores</button>
                    <button
                        type="button"
                        onClick={() => navigator('./imagenes')}
                        className="buttonD">Editar Imagenes</button>
                    <button className="buttonA" type="submit">Guardar</button>
                </form>
            </div>
            <Loader loader={loader} />
        </div>
    )
}

export default AccesoriosEdit

type AccesorioType = {
    name: string,
    material: string,
    stock: number,
    price: number,
    off: number
}