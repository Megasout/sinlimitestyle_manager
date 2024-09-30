import { useCallback } from "react"
import { useDropzone } from "react-dropzone"

type DropZoneType = {
    setFiles: (files: File[]) => void,
    files?: File[],
    setUrls?: (urls: ImageType[]) => void,
    urls?: ImageType[],
    className?: string
}

function DropZone(prop: DropZoneType) {
    const { files, setFiles, className, urls, setUrls } = prop

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (!canAcceptFiles(acceptedFiles.length, files ? files.length : 0, urls ? urls.length : 0)) {
            alert('No se puede superar el limite de 10 imagenes')
            return
        }

        if (!files || files.length == 0) {
            setFiles([...acceptedFiles])
        } else {
            setFiles([...files, ...acceptedFiles])
        }
    }, [files])

    const deleteImage = (index: number) => {
        setFiles(files?.filter((_, oIndex) => oIndex !== index)!)
    }

    const deleteUrl = (index: number) => {
        setUrls!(urls?.filter((_, oIndex) => oIndex !== index)!)
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } })

    return (
        <div className={`dropzone_images ${className && className}`}>
            <div className={`add ${isDragActive ? 'isDragActive' : ''}`}>
                <i className="fa-solid fa-cloud-arrow-up"></i>
                <h2>{`${isDragActive ? 'Suelta el archivo para subir' : 'Arrastre y suelte sus imágenes aquí'}`}</h2>
                <p>O</p>
                <h3>Buscar archivos</h3>

                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                </div>
            </div>

            <div className="images_list">
                <div className="images">
                    {urls &&
                        urls.map((url, index) =>
                            <ShowImage
                                key={index}
                                deleteImage={deleteUrl}
                                index={index}
                                url={url.url} />)}
                    {!files ?
                        <></> :
                        files.map((file, index) =>
                            <ShowImage
                                key={index}
                                deleteImage={deleteImage}
                                index={index}
                                url={URL.createObjectURL(file)} />)}
                </div>
            </div>
        </div>
    )
}

export default DropZone


type ShowImageType = {
    index: number,
    deleteImage: (value: number) => void,
    url: string
}

function ShowImage(props: ShowImageType) {
    const { deleteImage, index, url } = props

    return (
        <div className="image">
            <i onClick={() => deleteImage(index)} className="fa-solid fa-xmark"></i>
            <img src={url}></img>
        </div>
    )
}

type ImageType = {
    id: number,
    url: string
}

function canAcceptFiles(acceptedFiles: number, files: number, urls: number): boolean {
    return acceptedFiles + files + urls <= 10
}