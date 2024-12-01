import { FormEvent, useState } from "react"
import DropZone from "../../../Components/DropZone"
import { postToTableWithFormData } from "../../../Models/post"
import { useLoaderData, useNavigate } from "react-router-dom"
import TitleWithBackButton from "../../../Components/TitleWithBackButton"
import Loader from "../../../Components/Loader"
import getFromTable from "../../../Models/get"

export async function loader({ params }: any) {
    const type = params.TYPE

    if (type != 'Prendas' && type != 'Accesorios')
        throw new Response('', {
            status: 404
        })

    const [categorias] = await Promise.all([
        getFromTable(`/get/categorias/bytype/${type == 'Prendas' ? 'prenda' : 'accesorio'}`),
    ])

    return { categorias: categorias, type: type == 'Prendas' ? 'prenda' : 'accesorio' }
}

function ProductoAdd() {
    const { categorias, type } = useLoaderData() as any
    const navigator = useNavigate()
    const [loader, setLoader] = useState(false)

    const direction = type == 'prenda' ? 'Prendas' : 'Accesorios'

    const [files, setFiles] = useState<File[]>()
    const [producto, setProducto] = useState<ProductoType>({
        name: '',
        description: '',
        material: '',
        category: -1,
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

        formData.append('nombre', producto.name)
        formData.append('descripcion', producto.description)
        formData.append('material', producto.material)
        formData.append('precio', producto.price.toString())
        formData.append('descuento', producto.off.toString())
        if (producto.category !== -1) {
            formData.append('id_categoria', producto.category.toString())
        }

        const result = await postToTableWithFormData(formData, `/post/${type}`)

        return navigator(`../${direction}/${result.id}/edit`)
    }


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setProducto(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="prendas_add">
            <TitleWithBackButton direction={`../${direction}`} title={`Agregar ${type[0].toUpperCase() + type.slice(1)}`} />
            <div className="content">
                <form
                    method="POST"
                    encType="multipart/form-data"
                    onSubmit={e => onSubmit(e)}
                    className="data">
                    <label>Nombre</label>
                    <input
                        name="name"
                        value={producto.name}
                        onChange={handleInputChange}
                        type="text"
                        placeholder={`Nombre${type == 'prenda' ? ' de la prenda...' : ' del accesorio'}`}
                        required
                    />
                    <label>Descripción</label>
                    <textarea
                        name="description"
                        value={producto.description}
                        placeholder={`Descripción${type == 'prenda' ? ' de la prenda...' : ' del accesorio'}`}
                        onChange={handleInputChange}></textarea>
                    <label>Categoria</label>
                    <select
                        name="category"
                        value={producto.category}
                        onChange={handleInputChange}>
                        <option value={-1}>---Sin Seleccionar---</option>
                        {categorias.map((categoria: any) =>
                            <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>)}
                    </select>
                    <label>Material</label>
                    <input
                        name="material"
                        value={producto.material}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Materiales..."
                        required />
                    <label>Precio</label>
                    <input
                        name="price"
                        min={1}
                        value={producto.price}
                        onChange={handleInputChange}
                        type="number"
                        placeholder="Precio completo"
                        required />
                    <label>Descuento %</label>
                    <input
                        name="off"
                        min={0}
                        max={100}
                        value={producto.off}
                        onChange={handleInputChange}
                        type="number"
                        placeholder="Descuento %" />
                    <button className="buttonA" type="submit">Guardar</button>
                </form>
                <DropZone setFiles={setFiles} files={files} />
            </div>
            <Loader loader={loader} />
        </div>
    )
}

export default ProductoAdd

type ProductoType = {
    name: string,
    description: string,
    category: number,
    material: string,
    price: number,
    off: number
}