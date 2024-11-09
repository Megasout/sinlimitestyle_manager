import { useNavigate } from "react-router-dom"

type TitleWithBackButtonType =
    | {
        title: string,
        direction: string,
        deleteButton?: false
        onClickDeleteButton?: undefined
    }
    | {
        title: string,
        direction: string,
        deleteButton: true,
        onClickDeleteButton: () => void
    }

function TitleWithBackButton(props: TitleWithBackButtonType) {
    const { direction, title, deleteButton, onClickDeleteButton } = props
    const navigator = useNavigate()

    const handleOnClick = () => {
        navigator(direction)
    }

    return (
        <div className="titleWithBackButton">
            <i onClick={handleOnClick} className="fa-solid fa-angle-left"></i>
            <h1>{title}</h1>
            {deleteButton &&
                <>
                    <div style={{width: "100%"}}></div>
                    <button onClick={onClickDeleteButton}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </>
            }
        </div>
    )
}

export default TitleWithBackButton