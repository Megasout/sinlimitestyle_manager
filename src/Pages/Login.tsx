import { Form } from "react-router-dom"
import "../Styles/login.scss"
import React, { useEffect, useRef, useState } from "react"

function Login() {
    return (
        <div className="login">
            <div className="block">
                <h1>Acceder</h1>
                <Form>
                    <div className="info">
                        <InputLogin text="Dirección de email" type="email" />
                        <InputLogin text="Contraseña" type="password" showButton />
                    </div>
                    <input type="submit" value={"ACCEDER"} />
                </Form>
            </div>
        </div>
    )
}

export default Login

type InputLoginType = {
    text: string,
    type: React.HTMLInputTypeAttribute,
    showButton?: boolean
}

function InputLogin(props: InputLoginType) {
    const { text, type, showButton } = props
    const inputRef = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState<string | undefined>()
    const [labelPlaceholder, setLabel] = useState(true)
    const [showText, setShowText] = useState(false)

    useEffect(() => {
        if (value != '')
            setLabel(false)
    }, [value])

    const handleOnFocus = () => {
        setLabel(false)
    }

    const handleOnBlur = () => {
        if (value == '')
            setLabel(true)
    }

    const handleOnChange = (event: any) => {
        setValue(event.target.value)
    }

    const handleShowButton = () => {
        setShowText(!showText)

        if(inputRef.current)
            inputRef.current.focus()
    }

    return (
        <div style={{ position: "relative" }}>
            <label className={`${!labelPlaceholder ? 'placeholder' : ''}`}>{text}</label>
            <input
                ref={inputRef}
                onBlur={handleOnBlur}
                onFocus={handleOnFocus}
                type={showButton && showText ? "text" : type}
                value={value} onChange={handleOnChange} />
            {showButton && <button onClick={handleShowButton}>{showText ? "OCULTAR" : "MOSTRAR"}</button>}
        </div>
    )
}