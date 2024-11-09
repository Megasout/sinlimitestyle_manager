import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import getFromTable from "../../../Models/get"
import { useLoaderData, useNavigate } from "react-router-dom"
import DropZoneOneImage from "../../../Components/DropZoneOneImage"
import { putToTableWithFormData } from "../../../Models/put"
import TitleWithBackButton from "../../../Components/TitleWithBackButton"
import Loader from "../../../Components/Loader"
import deleteFromTable from "../../../Models/delete"
import Confirm from "../../../Components/Confirm"

//TODO: agregar boton de ocultar o mostrar

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
    const [loader, setLoader] = useState(false)

    const [confirm, setConfirm] = useState(false)

    useEffect(() => {
        setLoader(false)
    }, [prenda])

    const handleDeletePrenda = async () => {
        try {
            setLoader(true)
            await deleteFromTable(`/delete/prenda/${prenda.id}`)
            return navigator(`../Prendas`)

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
                direction="../Prendas"
                title="Editar Prenda" />
            <ContentEdit
                miniatura={miniatura}
                prenda={prenda}
                setLoader={setLoader} />
            <Loader loader={loader} />
            <Confirm
                isActive={confirm}
                message="Desea eliminar esta prenda?"
                onResponse={handleDeletePrenda} setIsActive={setConfirm} />
        </div>
    )
}

export default PrendasEdit

type PrendaType = {
    name: string,
    material: string,
    stock: number,
    price: number,
    off: number,
    isActive: boolean
}

type ContentEditType = {
    prenda: any,
    miniatura: any,
    setLoader: (value: boolean) => void
}

function ContentEdit(props: ContentEditType) {
    const { prenda, miniatura, setLoader } = props
    const navigator = useNavigate()

    const [file, setFile] = useState<File>()
    const [url, setUrl] = useState<string>(miniatura ? miniatura.url : '')

    const [prendaData, setPrenda] = useState<PrendaType>({
        name: prenda.nombre,
        material: prenda.material,
        off: prenda.descuento,
        price: prenda.precio,
        stock: prenda.stock,
        isActive: prenda.activo
    } as PrendaType)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target

        if (type === 'checkbox') {
            setPrenda(prev => ({ ...prev, [name]: !prendaData.isActive}))
        } else {
            setPrenda(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoader(true)

        const formData = new FormData()

        if (url == '' && file)
            formData.append('file', file)

        formData.append('nombre', prendaData.name)
        formData.append('material', prendaData.material)
        formData.append('precio', prendaData.price.toString())
        formData.append('descuento', prendaData.off.toString())
        formData.append('activo', prendaData.isActive.toString())

        await putToTableWithFormData(formData, `/put/prenda/${prenda.id}`)
        return navigator(`../Prendas/${prenda.id}/edit`)
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
                <div className="checkbox">
                    <input
                        id="check"
                        type="checkbox"
                        name="isActive"
                        checked={prendaData.isActive}
                        onChange={handleInputChange}
                    ></input>
                    <label htmlFor="check">Mostrar Producto</label>
                </div>
                <button className="buttonA" type="submit">Guardar</button>
            </form>
        </div>
    )
}