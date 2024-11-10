import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom"
import getFromTable from "../../../Models/get"
import React, { FormEvent, useEffect, useState } from "react"
import { filterbyCategoryId } from "../../../Helpers"
import { postToTable } from "../../../Models/post"
import deleteFromTable from "../../../Models/delete"
import { putToTable } from "../../../Models/put"
import Confirm from "../../../Components/Confirm"
import Loader from "../../../Components/Loader"
import TitleWithBackButton from "../../../Components/TitleWithBackButton"
import TableLines from "../../../Components/TableLines"

export async function loader({ params }: any) {
    const id = params.ID
    const type = params.TYPE

    if (type != 'Prendas' && type != 'Accesorios')
        throw new Response('', {
            status: 404
        })

    const [producto, categorias, talles, tallesProducto] = await Promise.all([
        getFromTable(`/get/producto/${id}`),
        getFromTable(`/get/categorias/bytype/${type == 'Prendas' ? 'prenda' : 'accesorio'}`),
        getFromTable(`/get/talles`),
        getFromTable(`/get/talles/producto/${id}`)
    ])

    return { producto: producto[0], categorias, talles, tallesProducto, type }
}

export async function action({ params }: any) {
    const idT = params.TALLEID
    const idP = params.ID
    const type = params.TYPE

    await deleteFromTable(`/delete/talle/producto/${idT}`)

    return redirect(`../${type}/${idP}/edit/talles`)
}

function ProductoTalle() {
    const { producto, categorias, talles, tallesProducto, type } = useLoaderData() as any
    const navigator = useNavigate()

    const [categoriaSelect, setCategoria] = useState(producto.id_categoria ? producto.id_categoria : -1)
    const [selectC, setSelectC] = useState(producto.id_categoria ? producto.id_categoria : -1)

    const [isConfirmActive, setisConfirmActive] = useState(false)
    const [loader, setLoader] = useState(false)

    const handleOnClick = async () => {
        setisConfirmActive(true)
    }

    console.log(tallesProducto)

    const handleOnResponse = async () => {
        setLoader(true)
        setCategoria(selectC)

        await Promise.all([
            deleteFromTable(`/delete/talles/producto/${producto.id}`),
            putToTable({ id_categoria: parseInt(selectC) == -1 ? undefined : selectC }, `/put/producto/${producto.id}/categoria`)
        ])

        navigator(`../${type}/${producto.id}/edit/talles`)
    }

    useEffect(() => {
        setLoader(false)
    }, [producto.id_categoria, tallesProducto])

    return (
        <div className="categorias">
            <TitleWithBackButton direction={`../${type}/${producto.id}/edit`} title="Editar Talles" />
            <p style={{ margin: '0.5rem', marginLeft: '1rem', fontSize: '1.6rem' }}>Categoria</p>
            <div style={{ display: "flex" }}>
                <select
                    className="select_categoria"
                    name="category"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectC(parseInt(e.target.value))}
                    value={selectC}>
                    <option value={-1}>---Sin Seleccionar---</option>
                    {categorias.map((categoria: any) =>
                        <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>)}
                </select>
                <button className="button_categoria" onClick={handleOnClick}>Guardar Categoria</button>
            </div>
            <div className="get">
                <table>
                    <thead>
                        <tr className="title">
                            <th>
                                <p>Talle</p>
                            </th>
                            <th>
                                <p>Stock</p>
                            </th>
                            <th>
                                <p>Acciones</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableLines lines={3} />
                        <AddTalle
                            idProducto={producto.id}
                            type={type}
                            talles={categoriaSelect == -1 ? [] : filterbyCategoryId(talles, categoriaSelect).filter(
                                talleS => !tallesProducto.some((talleP: any) => talleP.id === talleS.id))}
                            setLoader={setLoader} />
                        <TableLines lines={3} />
                        {tallesProducto.map((talle: any) =>
                            <ShowTalles
                                key={talle.id}
                                type={type}
                                idProducto={producto.id}
                                talle={talle}
                                setLoader={setLoader} />)}
                    </tbody>
                </table>
            </div>

            <Confirm
                message={"Si la categoria cambia se resetearan los talles seleccionados. Desea continuar?"}
                isActive={isConfirmActive}
                setIsActive={setisConfirmActive}
                onResponse={handleOnResponse} />

            <Loader loader={loader} />
        </div>
    )
}

export default ProductoTalle

type AddTalleType = {
    talles: Array<any>,
    type: string,
    idProducto: number,
    setLoader: (value: boolean) => void
}

function AddTalle(prop: AddTalleType) {
    const { idProducto, talles, setLoader, type } = prop

    const [talleSelect, setTalle] = useState<number>(talles.length != 0 ? talles[0].id : -1)
    const [stock, setStock] = useState<string>('')
    const navigator = useNavigate()

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (stock == '')
            return

        setLoader(true)

        const data = talles.length == 0 ? {
            id_producto: idProducto,
            stock: stock
        } :
            {
                id_talle: talleSelect,
                id_producto: idProducto,
                stock: stock
            }

        await postToTable(data, '/post/talle/producto')
        return navigator(`../${type}/${idProducto}/edit/talles`)
    }

    useEffect(() => {
        setTalle(talles.length != 0 ? talles[0].id : -1)
    }, [talles])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        if (/^[0-9]*$/.test(inputValue))
            setStock(inputValue);
    }

    return (
        <tr className="selection">
            <td>
                <center>
                    <select
                        value={talleSelect}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTalle(e.target.value as any)}
                        disabled={talles.length == 0}>
                        {talles.map((talle: any) =>
                            <option key={talle.id} value={talle.id}>{talle.talle}</option>)}
                    </select>
                </center>
            </td>
            <td>
                <center>
                    <input
                        className="number"
                        min={0}
                        onChange={handleChange}
                        value={stock}
                        type="number"
                        placeholder="Stock..."
                        required />
                </center>
            </td>
            <td className="actions">
                <form
                    onSubmit={handleOnSubmit}
                    method="POST">
                    <button
                        className="add blue"
                        type="submit">Agregar</button>
                </form>
            </td>
        </tr>
    )
}

type ShowTallesType = {
    talle: any,
    idProducto: number,
    type: string,
    setLoader: (value: boolean) => void
}

function ShowTalles(prop: ShowTallesType) {
    const { talle, idProducto, setLoader, type } = prop

    const [stock, setStock] = useState<string>(talle.stock)
    const navigator = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        if (/^[0-9]*$/.test(inputValue))
            setStock(inputValue);
    }

    const handleOnClick = async () => {
        if (stock == '')
            return

        setLoader(true)

        const data = {
            stock: stock
        } 

        await putToTable(data, `/put/talle/stock/${talle.id}`)
        return navigator(`../${type}/${idProducto}/edit/talles`)
    }

    return (
        <tr className="item">
            <td>
                <p>{talle.talle}</p>
            </td>
            <td>
                <center>
                    <input
                        className="number"
                        min={0}
                        onChange={handleChange}
                        value={stock}
                        type="number"
                        placeholder="Stock..."
                        required />
                </center>
            </td>
            <td className="actions">
                <Form
                    action={`../${type}/${idProducto}/edit/talles/${talle.id}/delete`}
                    method="POST"
                    onSubmit={(e) => {
                        if (!confirm(`Quiere eliminar el talle: ${talle.talle}?`))
                            return e.preventDefault()
                        setLoader(true)
                    }}>
                    <button
                        onClick={handleOnClick}
                        className="blue"
                        type="button">Editar</button>
                    <button
                        onClick={() => { }}
                        type="submit">Eliminar</button>
                </Form>
            </td>
        </tr>
    )
}