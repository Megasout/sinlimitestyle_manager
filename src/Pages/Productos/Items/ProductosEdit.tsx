import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import getFromTable from "../../../Models/get"
import { useLoaderData, useNavigate } from "react-router-dom"
import DropZoneOneImage from "../../../Components/DropZoneOneImage"
import { putToTableWithFormData } from "../../../Models/put"
import TitleWithBackButton from "../../../Components/TitleWithBackButton"
import Loader from "../../../Components/Loader"
import deleteFromTable from "../../../Models/delete"
import Confirm from "../../../Components/Confirm"

export async function loader({ params }: any) {
    const id = params.ID
    const t = params.TYPE

    if (t != 'Prendas' && t != 'Accesorios')
        throw new Response('', {
            status: 404
        })

    const [producto, miniatura] = await Promise.all([
        getFromTable(`/get/producto/${id}`),
        getFromTable(`/get/miniatura/producto/${id}`)
    ])

    return { producto: producto[0], miniatura: miniatura[0], type: t == 'Prendas' ? 'prenda' : 'accesorio' }
}

function ProductosEdit() {
    const { producto, miniatura, type } = useLoaderData() as any
    const navigator = useNavigate()
    const [loader, setLoader] = useState(false)

    const direction = type == 'prenda' ? 'Prendas' : 'Accesorios'

    const [confirm, setConfirm] = useState(false)

    useEffect(() => {
        setLoader(false)
    }, [producto])

    const handleDeleteProducto = async () => {
        try {
            setLoader(true)
            await deleteFromTable(`/delete/producto/${producto.id}`)
            return navigator(`../${direction}`)

        } catch (err) {
            setLoader(false)
            throw new Error('aaa')
        }
    }

    return (
        <div className="prendas_add">
            <TitleWithBackButton
                deleteButton
                onClickDeleteButton={() => setConfirm(true)}
                direction={`../${direction}`}
                title={`Editar ${type[0].toUpperCase() + type.slice(1)}`} />
            <ContentEdit
                miniatura={miniatura}
                producto={producto}
                type={type}
                direction={direction}
                setLoader={setLoader} />
            <Loader loader={loader} />
            <Confirm
                isActive={confirm}
                message={`Desea eliminar ${type == 'prenda' ? 'esta prenda?' : 'este accesorio?'}`}
                onResponse={handleDeleteProducto} setIsActive={setConfirm} />
        </div>
    )
}

export default ProductosEdit

type ProductoType = {
    name: string,
    description: string,
    material: string,
    stock: number,
    price: number,
    off: number,
    isActive: boolean
}

type ContentEditType = {
    producto: any,
    type: string,
    direction: string,
    miniatura: any,
    setLoader: (value: boolean) => void
}

function ContentEdit(props: ContentEditType) {
    const { producto, miniatura, setLoader, type, direction } = props
    const navigator = useNavigate()

    const [file, setFile] = useState<File>()
    const [url, setUrl] = useState<string>(miniatura ? miniatura.url : '')

    const [productoData, setProducto] = useState<ProductoType>({
        name: producto.nombre,
        material: producto.material,
        off: producto.descuento,
        price: producto.precio,
        stock: producto.stock,
        description: producto.descripcion,
        isActive: producto.activo == 1
    } as ProductoType)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target

        if (type === 'checkbox') {
            setProducto(prev => ({ ...prev, [name]: !productoData.isActive }))
        } else {
            setProducto(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoader(true)

        const formData = new FormData()

        if (url == '' && file)
            formData.append('file', file)

        formData.append('nombre', productoData.name)
        formData.append('descripcion', productoData.description)
        formData.append('material', productoData.material)
        formData.append('precio', productoData.price.toString())
        formData.append('descuento', productoData.off.toString())
        formData.append('activo', productoData.isActive.toString())

        console.log(productoData.isActive.toString())

        await putToTableWithFormData(formData, `/put/producto/${producto.id}`)
        return navigator(`../${direction}/${producto.id}/edit`)
    }

    return (
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
                    value={productoData.name}
                    onChange={handleInputChange}
                    type="text"
                    placeholder={`Nombre${type == 'prenda' ? ' de la prenda...' : ' del accesorio'}`}
                    required
                />
                <label>Descripción</label>
                <textarea
                    name="description"
                    value={productoData.description}
                    placeholder={`Descripción${type == 'prenda' ? ' de la prenda...' : ' del accesorio'}`}
                    onChange={handleInputChange}></textarea>
                <label>Material</label>
                <input
                    name="material"
                    value={productoData.material}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Materiales..."
                    required />
                <label>Precio</label>
                <input
                    name="price"
                    min={0}
                    value={productoData.price}
                    onChange={handleInputChange}
                    type="number"
                    placeholder="Precio completo"
                    required />
                <label>Descuento %</label>
                <input
                    name="off"
                    min={0}
                    value={productoData.off}
                    onChange={handleInputChange}
                    type="number"
                    placeholder="Descuento %" />
                <button
                    type="button"
                    onClick={() => navigator('./talles')}
                    className="buttonC">Seleccionar Categoria, Talles y Stock</button>
                <button
                    type="button"
                    onClick={() => navigator('./imagenes')}
                    className="buttonD">Editar Imagenes</button>
                <div className="checkbox">
                    <input
                        id="check"
                        type="checkbox"
                        name="isActive"
                        checked={productoData.isActive}
                        onChange={handleInputChange}
                    ></input>
                    <label htmlFor="check">Mostrar Producto</label>
                </div>
                <button className="buttonA" type="submit">Guardar</button>
            </form>
        </div>
    )
}