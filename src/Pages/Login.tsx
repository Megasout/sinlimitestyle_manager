import { Form } from "react-router-dom"
import "../Styles/login.scss"
import React, { useRef, useState } from "react"

function Login() {
    return (
        <div className="login">
            <div className="block">
                <h1>Acceder</h1>
                <Form>
                    <div className="info">
                        <InputLogin text="Dirección de email" type="email" />
                        <InputLogin text="Contraseña" type="password" />
                    </div>
                    <input type="submit" value={"ACCEDER"}/>
                </Form>
            </div>
        </div>
    )
}

export default Login

type InputLoginType = {
    text: string,
    type: React.HTMLInputTypeAttribute
}

function InputLogin(props: InputLoginType) {
    const { text } = props
    const inputRef = useRef<HTMLInputElement>(null)
    const [labelPlaceholder, setLabel] = useState(true)

    const handleOnFocus = () => {
        setLabel(false)
    }

    const handleOnBlur = () => {
        if (inputRef.current?.value === '')
            setLabel(true)
    }

    return (
        <div style={{ position: "relative" }}>
            <label className={`${!labelPlaceholder ? 'placeholder' : ''}`}>{text}</label>
            <input ref={inputRef} onBlur={handleOnBlur} onFocus={handleOnFocus} type="email" />
        </div>
    )
}