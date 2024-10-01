import { FormEvent, useEffect, useState } from "react"
import Loader from "../../../Components/Loader"
import TitleWithBackButton from "../../../Components/TitleWithBackButton"
import getFromTable from "../../../Models/get"
import { useLoaderData, useNavigate } from "react-router-dom"
import DropZone from "../../../Components/DropZone"
import { putToTableWithFormData } from "../../../Models/put"

export async function loader({ params }: any) {
    const id = params.ID

    const imagenes = await getFromTable(`/get/imagenes/prenda/${id}`)

    return { prendaId: id, imagenes: imagenes }
}

function PrendaImagenes() {
    const { prendaId, imagenes } = useLoaderData() as any
    const navigator = useNavigate()
    const [loader, setLoader] = useState(false)
    const [files, setFiles] = useState<File[]>()
    const [urls, setUrls] = useState<ImageType[]>([])

    useEffect(() => {
        let images: ImageType[] = []
        imagenes.forEach((imagen: any) => {
            images.push({ id: imagen.id, url: imagen.url })
        });
        setUrls(images)
    }, [])

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const deleteImages: Array<any> = imagenes.filter((imagen: any) => !urls.some(url => url.id == imagen.id))

        if (deleteImages.length == 0 && (!files || files.length == 0))
            return

        setLoader(true)

        const formData = new FormData()

        if (files)
            files.forEach(file => formData.append('files', file))

        formData.append('delete_urls', JSON.stringify(deleteImages))

        await putToTableWithFormData(formData, `/put/imagenes/prenda/${prendaId}`)

        return navigator(`../Prendas/${prendaId}/edit/imagenes`)
    }

    useEffect(() => {
        setLoader(false)
    }, [imagenes])

    return (
        <div className="prenda_imagenes">
            <TitleWithBackButton direction={`../Prendas/${prendaId}/edit`} title="Editar Imagenes" />
            <DropZone className="drop" files={files} setFiles={setFiles} urls={urls} setUrls={setUrls} />
            <form
                method="POST"
                encType="multipart/form-data"
                onSubmit={handleOnSubmit}>
                <input className="save" type="submit" value={"Guardar"} />
            </form>
            <Loader loader={loader} />
        </div>
    )
}

export default PrendaImagenes

type ImageType = {
    id: number,
    url: string
}