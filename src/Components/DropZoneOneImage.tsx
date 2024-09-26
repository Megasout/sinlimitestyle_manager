import { useCallback } from "react"
import { useDropzone } from "react-dropzone"

type DropZoneOneImageType = {
    setFile: (file: File) => void,
    file?: File,
    className?: string
}

function DropZoneOneImage(prop: DropZoneOneImageType) {
    const { file, setFile, className } = prop

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFile(acceptedFiles[0])
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } })

    return (
        <div className="dropzone_images">
            <div className={`add ${isDragActive ? 'isDragActive' : ''} ${className ? ' ' + className : ''}`}>
                <i className="fa-solid fa-cloud-arrow-up"></i>
                <h2>{`${isDragActive ? 'Suelta el archivo para subir' : 'Arrastre y suelte su imágen aquí'}`}</h2>
                <p>O</p>
                <h3>Buscar archivos</h3>

                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                </div>

                {file &&
                    <img className="background" src={URL.createObjectURL(file)}/>}
            </div>
        </div>
    )
}

export default DropZoneOneImage