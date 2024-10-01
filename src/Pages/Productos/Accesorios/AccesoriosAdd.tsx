import { FormEvent, useState } from "react"
import DropZone from "../../../Components/DropZone"
import { postToTableWithFormData } from "../../../Models/post"
import { useLoaderData, useNavigate } from "react-router-dom"
import TitleWithBackButton from "../../../Components/TitleWithBackButton"
import Loader from "../../../Components/Loader"

function AccesoriosAdd() {
    const { categorias } = useLoaderData() as any
    const navigator = useNavigate()
    const [loader, setLoader] = useState(false)

    const [files, setFiles] = useState<File[]>()
    const [accesorio, setAccesorio] = useState<AccesorioType>({
        name: '',
        material: '',
        category: -1,
        stock: 0,
        price: 0,
        off: 0
    })

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoader(true)

        const formData = new FormData()

        if (files)
            files.forEach((file) => {
                formData.append(`files`, file)
            })

        formData.append('nombre', accesorio.name)
        formData.append('material', accesorio.material)
        formData.append('stock', accesorio.stock.toString())
        formData.append('precio', accesorio.price.toString())
        formData.append('descuento', accesorio.off.toString())
        if (accesorio.category !== -1) {
            formData.append('id_categoria', accesorio.category.toString())
        }

        const result = await postToTableWithFormData(formData, '/post/accesorio')

        return navigator(`../Accesorios/${result.id}/edit`)
    }


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setAccesorio(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="prendas_add">
            <TitleWithBackButton direction="../Accesorios" title="Agregar Accesorio"/>
            <div className="content">
                <form
                    method="POST"
                    encType="multipart/form-data"
                    onSubmit={e => onSubmit(e)}
                    className="data">
                    <label>Nombre</label>
                    <input
                        name="name"
                        value={accesorio?.name}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Nombre del accesorio..."
                        required
                    />
                    <label>Categoria</label>
                    <select
                        name="category"
                        value={accesorio.category}
                        onChange={handleInputChange}>
                        <option value={-1}>---Sin Seleccionar---</option>
                        {categorias.map((categoria: any) =>
                            <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>)}
                    </select>
                    <label>Material</label>
                    <input
                        name="material"
                        value={accesorio.material}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Materiales..."
                        required />
                    <label>Stock</label>
                    <input
                        name="stock"
                        min={0}
                        value={accesorio.stock}
                        onChange={handleInputChange}
                        type="number"
                        placeholder="Cantidad en stock"
                        required />
                    <label>Precio</label>
                    <input
                        name="price"
                        min={0}
                        value={accesorio.price}
                        onChange={handleInputChange}
                        type="number"
                        placeholder="Precio completo"
                        required />
                    <label>Descuento %</label>
                    <input
                        name="off"
                        min={0}
                        max={100}
                        value={accesorio.off}
                        onChange={handleInputChange}
                        type="number"
                        placeholder="Descuento %" />
                    <button className="buttonA" type="submit">Guardar</button>
                </form>
                <DropZone setFiles={setFiles} files={files} />
            </div>
            <Loader loader={loader}/>
        </div>
    )
}

export default AccesoriosAdd

type AccesorioType = {
    name: string,
    category: number,
    material: string,
    stock: number,
    price: number,
    off: number
}