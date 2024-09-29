type ConfirmType = {
    isActive: boolean,
    message: string,
    onResponse: () => void,
    setIsActive: (value: boolean) => void
}

function Confirm(props: ConfirmType) {
    const { isActive, message, onResponse, setIsActive } = props

    const handleOnClick = (value: boolean) => {
        if (value)
            onResponse()
        setIsActive(false)
    }

    if (!isActive)
        return <></>

    return (
        <div className="confirm_windows">
            <h3>{message}</h3>
            <div className="confirm_buttons">
                <button onClick={() => handleOnClick(false)}>No</button>
                <button onClick={() => handleOnClick(true)}>Si</button>
            </div>
        </div>
    )
}

export default Confirm