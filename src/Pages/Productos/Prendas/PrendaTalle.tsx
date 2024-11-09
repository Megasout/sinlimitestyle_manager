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

//TODO: stok va talle cambiar eso

export async function loader({ params }: any) {
    const id = params.ID

    const [prenda, categorias, talles, tallesProducto] = await Promise.all([
        getFromTable(`/get/prenda/${id}`),
        getFromTable('/get/categorias/bytype/Ropa'),
        getFromTable(`/get/talles`),
        getFromTable(`/get/talles/prenda/${id}`)
    ])

    return { prenda: prenda[0], categorias: categorias, talles: talles, tallesProducto: tallesProducto }
}

export async function action({ params }: any) {
    const idT = params.TALLEID
    const idP = params.ID

    await deleteFromTable(`/delete/talle/${idT}/prenda/${idP}`)

    return redirect(`../Prendas/${idP}/edit/talles`)
}

function PrendaTalle() {
    const { prenda, categorias, talles, tallesProducto } = useLoaderData() as any
    const navigator = useNavigate()

    const [categoriaSelect, setCategoria] = useState(prenda.id_categoria ? prenda.id_categoria : -1)
    const [selectC, setSelectC] = useState(prenda.id_categoria ? prenda.id_categoria : -1)

    const [isConfirmActive, setisConfirmActive] = useState(false)
    const [loader, setLoader] = useState(false)

    const handleOnClick = async () => {
        setisConfirmActive(true)
    }

    const handleOnResponse = async () => {
        setLoader(true)
        setCategoria(selectC)

        await Promise.all([
            deleteFromTable(`/delete/talles/prenda/${prenda.id}`),
            putToTable({ id_categoria: parseInt(selectC) == -1 ? undefined : selectC }, `/put/prenda/${prenda.id}/categoria`)
        ])

        navigator(`../Prendas/${prenda.id}/edit/talles`)
    }

    useEffect(() => {
        setLoader(false)
    }, [prenda.id_categoria, tallesProducto])

    return (
        <div className="categorias">
            <TitleWithBackButton direction={`../Prendas/${prenda.id}/edit`} title="Editar Talles" />
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
                                <p>Acciones</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableLines lines={2} />
                        <AddTalle
                            idPrenda={prenda.id}
                            talles={categoriaSelect == -1 ? [] : filterbyCategoryId(talles, categoriaSelect).filter(
                                talleS => !tallesProducto.some((talleP: any) => talleP.id === talleS.id))}
                            setLoader={setLoader} />
                        <TableLines lines={2} />
                        <ShowTalles
                            idPrenda={prenda.id}
                            talles={tallesProducto}
                            setLoader={setLoader} />
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

export default PrendaTalle

type AddTalleType = {
    talles: Array<any>,
    idPrenda: number,
    setLoader: (value: boolean) => void
}

function AddTalle(prop: AddTalleType) {
    const { idPrenda, talles, setLoader } = prop

    const [talleSelect, setTalle] = useState<number>(talles.length != 0 ? talles[0].id : -1)
    const navigator = useNavigate()

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoader(true)

        const data = {
            id_talle: talleSelect,
            id_producto: idPrenda
        }

        await postToTable(data, '/post/talle/prenda')
        return navigator(`../Prendas/${idPrenda}/edit/talles`)
    }

    useEffect(() => {
        setTalle(talles.length != 0 ? talles[0].id : -1)
    }, [talles])

    return (
        <tr className="selection">
            <td>
                <center>
                    <select
                        value={talleSelect}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTalle(parseInt(e.target.value))}
                        disabled={talles.length == 0}>
                        {talles.map((talle: any) =>
                            <option key={talle.id} value={talle.id}>{talle.talle}</option>)}
                    </select>
                </center>
            </td>
            <td className="actions">
                <form
                    onSubmit={handleOnSubmit}
                    method="POST">
                    <button
                        disabled={talles.length == 0}
                        className="add blue"
                        type="submit">Agregar</button>
                </form>
            </td>
        </tr>
    )
}

type ShowTallesType = {
    talles: Array<any>,
    idPrenda: number,
    setLoader: (value: boolean) => void
}

function ShowTalles(prop: ShowTallesType) {
    const { talles, idPrenda, setLoader } = prop

    return talles.map((talle: any) =>
        <tr key={talle.id} className="item">
            <td>
                <p>{talle.talle}</p>
            </td>
            <td className="actions">
                <Form
                    action={`../Prendas/${idPrenda}/edit/talles/${talle.id}/delete`}
                    method="POST"
                    onSubmit={(e) => {
                        if (!confirm(`Quiere eliminar el talle: ${talle.talle}?`))
                            return e.preventDefault()
                        setLoader(true)
                    }}>
                    <button
                        className="add"
                        onClick={() => { }}
                        type="submit">Eliminar</button>
                </Form>
            </td>
        </tr>)
}