import { useCallback } from "react"
import { useDropzone } from "react-dropzone"

type DropZoneType = {
    setFiles: (files: File[]) => void,
    files?: File[]
}

function DropZone(prop: DropZoneType) {
    const { setFiles } = prop

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div className="dropzone_images">
            <div className="add">
                <i className="fa-solid fa-cloud-arrow-up"></i>
                <h2>Arrastre y suelte sus imágenes aquí</h2>
                <p>O</p>
                <h3>Buscar archivos</h3>

                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                </div>
            </div>


            <div className="images_list">
                <div className="images">
                    <div className="image"></div>
                    <div className="image"></div>
                    <div className="image"></div>
                </div>
            </div>
        </div>
    )
}

export default DropZone