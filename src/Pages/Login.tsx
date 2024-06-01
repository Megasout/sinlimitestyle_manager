import { Form } from "react-router-dom"
import "../Styles/login.scss"
import React, { ChangeEvent, useEffect, useRef, useState } from "react"

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
                    <input type="submit" value={"ACCEDER"} />
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
    const { text, type } = props
    // const inputRef = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState<string | undefined>()
    const [labelPlaceholder, setLabel] = useState(true)

    useEffect(() => {
        if(value != '')
            setLabel(false)
    }, [value])

    const handleOnFocus = () => {
        setLabel(false)
    }

    const handleOnBlur = () => {
        // if (inputRef.current?.value === '')
        if (value == '')
            setLabel(true)
    }

    const handleOnChange = (event: any) => {
        setValue(event.target.value)
    }

    return (
        <div style={{ position: "relative" }}>
            <label className={`${!labelPlaceholder ? 'placeholder' : ''}`}>{text}</label>
            <input onBlur={handleOnBlur} onFocus={handleOnFocus} type={type} value={value} onChange={handleOnChange} />
        </div>
    )
}