import { useCallback } from "react"
import { useDropzone } from "react-dropzone"

type DropZoneType = {
    setFiles: (files: File[]) => void,
    files?: File[]
}

function DropZone(prop: DropZoneType) {
    const { files, setFiles } = prop

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (files && files.length == 10 || files && files.length + acceptedFiles.length > 10){
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

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } })

    return (
        <div className="dropzone_images">
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
                    {!files ?
                        <></> :
                        files.map((file, index) =>
                            <div key={index} className="image">
                                <i onClick={() => deleteImage(index)} className="fa-solid fa-xmark"></i>
                                <img src={URL.createObjectURL(file)}></img>
                            </div>)}
                </div>
            </div>
        </div>
    )
}

export default DropZone