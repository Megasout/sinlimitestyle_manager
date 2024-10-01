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

    const [accesorio, categorias, talles, tallesAccesorio] = await Promise.all([
        getFromTable(`/get/accesorio/${id}`),
        getFromTable('/get/categorias/bytype/Accesorio'),
        getFromTable(`/get/talles`),
        getFromTable(`/get/talles/accesorio/${id}`)
    ])

    return { accesorio: accesorio[0], categorias: categorias, talles: talles, tallesAccesorio: tallesAccesorio }
}

export async function action({ params }: any) {
    const idT = params.TALLEID
    const idA = params.ID

    await deleteFromTable(`/delete/talle/${idT}/accesorio/${idA}`)

    return redirect(`../Accesorios/${idA}/edit/talles`)
}

function AccesorioTalle() {
    const { accesorio, categorias, talles, tallesAccesorio } = useLoaderData() as any
    const navigator = useNavigate()

    const [categoriaSelect, setCategoria] = useState(accesorio.id_categoria ? accesorio.id_categoria : -1)
    const [selectC, setSelectC] = useState(accesorio.id_categoria ? accesorio.id_categoria : -1)

    const [isConfirmActive, setisConfirmActive] = useState(false)
    const [loader, setLoader] = useState(false)

    const handleOnClick = async () => {
        setisConfirmActive(true)
    }

    const handleOnResponse = async () => {
        setLoader(true)
        setCategoria(selectC)

        await Promise.all([
            deleteFromTable(`/delete/talles/accesorio/${accesorio.id}`),
            putToTable({ id_categoria: parseInt(selectC) == -1 ? undefined : selectC }, `/put/accesorio/${accesorio.id}/categoria`)
        ])

        navigator(`../Accesorios/${accesorio.id}/edit/talles`)
    }

    useEffect(() => {
        setLoader(false)
    }, [accesorio.id_categoria, tallesAccesorio])

    return (
        <div className="categorias">
            <TitleWithBackButton direction={`../Accesorios/${accesorio.id}/edit`} title="Editar Talles" />
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
                            idAccesorio={accesorio.id}
                            talles={categoriaSelect == -1 ? [] : filterbyCategoryId(talles, categoriaSelect).filter(
                                talleS => !tallesAccesorio.some((talleP: any) => talleP.id === talleS.id))}
                            setLoader={setLoader} />
                        <TableLines lines={2} />
                        <ShowTalles
                            idAccesorio={accesorio.id}
                            talles={tallesAccesorio}
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

export default AccesorioTalle

type AddTalleType = {
    talles: Array<any>,
    idAccesorio: number,
    setLoader: (value: boolean) => void
}

function AddTalle(prop: AddTalleType) {
    const { idAccesorio, talles, setLoader } = prop

    const [talleSelect, setTalle] = useState<number>(talles.length != 0 ? talles[0].id : -1)
    const navigator = useNavigate()

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoader(true)

        const data = {
            id_talle: talleSelect,
            id_accesorio: idAccesorio
        }

        await postToTable(data, '/post/talle/accesorio')
        return navigator(`../Accesorios/${idAccesorio}/edit/talles`)
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
    idAccesorio: number,
    setLoader: (value: boolean) => void
}

function ShowTalles(prop: ShowTallesType) {
    const { talles, idAccesorio, setLoader } = prop

    return talles.map((talle: any) =>
        <tr key={talle.id} className="item">
            <td>
                <p>{talle.talle}</p>
            </td>
            <td className="actions">
                <Form
                    action={`../Accesorios/${idAccesorio}/edit/talles/${talle.id}/delete`}
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