import { Form, redirect, useActionData } from "react-router-dom"
import "../Styles/login.scss"
import React, { ChangeEvent, useEffect, useRef, useState } from "react"
import { isTokenValid } from "../Models/token"
import { postLogin } from "../Models/post"

export async function loader() {
    const token = await isTokenValid()

    if (token.value) {
        return redirect('/Home')
    }

    return token
}

export async function action({ request }: any): Promise<any> {
    const formData = await request.formData() as FormData
    const data = Object.fromEntries(formData)

    const result = await postLogin(data)

    console.log(result)

    if ('token' in result) {
        localStorage.setItem('token', JSON.stringify(result.token))
        return redirect('/Home')
    }

    return result
}

function Login() {
    const result = useActionData() as any
    console.log(result)

    return (
        <div className="login">
            {result != undefined &&
                <div className="error">
                    <h2>{result.message}</h2>
                </div>}
            <div className="block">
                <h1>Acceder</h1>
                <Form method="post">
                    <div className="info">
                        <InputLogin name="email" text="Dirección de email" type="email" />
                        <InputLogin name="password" text="Contraseña" type="password" showButton />
                    </div>
                    <input type="submit" value={"ACCEDER"} />
                </Form>
            </div>
        </div>
    )
}

export default Login

type InputLoginType = {
    name: string,
    text: string,
    type: React.HTMLInputTypeAttribute,
    showButton?: boolean
}

function InputLogin(props: InputLoginType) {
    const { name, text, type, showButton } = props
    const inputRef = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState<string>('')
    const [canAnimated, setCanAnimated] = useState(false)
    const [labelPlaceholder, setLabel] = useState(true)
    const [showText, setShowText] = useState(false)

    useEffect(() => {
        setValue(' ')

        const timer = setTimeout(() => {
            setValue('')
            setCanAnimated(true)
        }, 100);

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (value != '' && canAnimated)
            setLabel(false)
    }, [value])

    const handleOnFocus = () => {
        setLabel(false)
    }

    const handleOnBlur = () => {
        if (inputRef.current?.value == '')
            setLabel(true)
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleShowButton = () => {
        setShowText(!showText)

        if (inputRef.current)
            inputRef.current.focus()
    }

    return (
        <div style={{ position: "relative" }}>
            <label className={`${!labelPlaceholder ? 'placeholder' : ''}`}>{text}</label>
            <input
                ref={inputRef}
                onBlur={handleOnBlur}
                onFocus={handleOnFocus}
                name={name}
                type={showButton && showText ? "text" : type}
                value={value} onChange={handleOnChange} />
            {showButton && <button type="button" onClick={handleShowButton}>{showText ? "OCULTAR" : "MOSTRAR"}</button>}
        </div>
    )
}