import { Colorful } from "@uiw/react-color";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "../../Styles/colores.scss"
import TitleWithSearch from "../../Components/TitleWithSearch";
import { postToTable } from "../../Models/post";
import { useLoaderData, useNavigate } from "react-router-dom";
import getFromTable from "../../Models/get";
import { filterbyName } from "../../Helpers";
import ColorElement from "../../Components/Productos/ColorElement";
import Loader from "../../Components/Loader";

export async function loader() {
    const result = await getFromTable('/get/colores')

    return result
}

function Colores() {
    const colores = useLoaderData() as Array<any>
    const navigator = useNavigate()
    const [nombre, setNombre] = useState('')
    const [hex, setHex] = useState("#fff");
    const [error, setError] = useState(false)
    const [filter, setFilter] = useState('')
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setLoader(false)
        setError(false)
    }, [colores])

    const handleColorTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setHex(e.target.value)
    }

    const handleNombreChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNombre(e.target.value)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (hex == '' || hex[0] != '#' || hex.length < 4) {
            return setError(true)
        }

        setLoader(true)

        const data = {
            nombre: nombre,
            hex: hex
        }

        await postToTable(data, '/post/color')
        return navigator('../Colores')
    }

    return (
        <div className="colores">
            <div className="get">
                <TitleWithSearch
                    title="Colores"
                    filter={filter}
                    onChange={(value) => setFilter(value)} />
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Hex</th>
                            <th>Color</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterbyName(colores, filter).map((color) =>
                        (
                            <ColorElement
                                key={color.id}
                                id={color.id}
                                hex={color.hex}
                                nombre={color.nombre}
                                setLoader={(value) => setLoader(value)} />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="add">
                <form method="post" onSubmit={handleSubmit}>
                    {
                        error && <div className="error">
                            <p>El color ingresado no es valido</p>
                        </div>
                    }
                    <h2>Agregar Color</h2>
                    <label>Nombre</label>
                    <input
                        className="name"
                        value={nombre}
                        onChange={handleNombreChange}
                        type="text"
                        placeholder="Nombre del color"
                        required />
                    <label>Color</label>
                    <div className="color_select">
                        <Colorful
                            className="color"
                            style={{ borderRadius: "0px" }}
                            color={hex}
                            onChange={(color) => setHex(color.hex)}
                            disableAlpha />
                        <div className="color_block">
                            <div className="block" style={{ backgroundColor: hex }} />
                            <input type="text" onChange={handleColorTextChange} value={hex} />
                        </div>
                    </div>
                    <input type="submit" />
                </form>
            </div>

            <Loader loader={loader} />
        </div>
    )
}

export default Colores
