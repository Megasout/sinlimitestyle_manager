import { FormEvent, useState } from "react"
import DropZone from "../../Components/DropZone"
import { postToTableWithFormData } from "../../Models/post"
import { useLoaderData, useNavigate } from "react-router-dom"

function PrendasAdd() {
    const { categorias } = useLoaderData() as any
    const navigator = useNavigate()

    const [files, setFiles] = useState<File[]>()
    const [prenda, setPrenda] = useState<PrendaType>({
        name: '',
        material: '',
        category: -1,
        stock: 0,
        price: 0,
        off: 0
    })

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData()

        if (files)
            files.forEach((file) => {
                formData.append(`files`, file)
            })

        formData.append('nombre', prenda.name)
        formData.append('material', prenda.material)
        formData.append('stock', prenda.stock.toString())
        formData.append('precio', prenda.price.toString())
        formData.append('descuento', prenda.off.toString())
        if (prenda.category !== -1) {
            formData.append('id_categoria', prenda.category.toString())
        }

        const result = await postToTableWithFormData(formData, '/post/prenda')

        return navigator(`../Prendas/${result.id}/edit`)
    }


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setPrenda(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="prendas_add">
            <div className="titleWidthSearch">
                <h1>Agregar Prenda</h1>
            </div>
            <div className="content">
                <form
                    method="POST"
                    encType="multipart/form-data"
                    onSubmit={e => onSubmit(e)}
                    className="data">
                    <label>Nombre</label>
                    <input
                        name="name"
                        value={prenda?.name}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Nombre de la prenda..."
                        required
                    />
                    <label>Categoria</label>
                    <select
                        name="category"
                        value={prenda.category}
                        onChange={handleInputChange}>
                        <option value={-1}>---Sin Seleccionar---</option>
                        {categorias.map((categoria: any) =>
                            <option value={categoria.id}>{categoria.nombre}</option>)}
                    </select>
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
                        max={100}
                        value={prenda.off}
                        onChange={handleInputChange}
                        type="number"
                        placeholder="Descuento %" />
                    <button className="buttonA" type="submit">Guardar</button>
                </form>
                <DropZone setFiles={setFiles} files={files} />
            </div>
        </div>
    )
}

export default PrendasAdd

type PrendaType = {
    name: string,
    category: number,
    material: string,
    stock: number,
    price: number,
    off: number
}