import { useNavigate } from "react-router-dom"

type TitleWithBackButtonType = {
    title: string,
    direction: string
}

function TitleWithBackButton(props: TitleWithBackButtonType) {
    const {direction, title} = props
    const navigator = useNavigate()

    const handleOnClick = () => {
        navigator(direction)
    }

    return (
        <div className="titleWithBackButton">
            <i onClick={handleOnClick} className="fa-solid fa-angle-left"></i>
            <h1>{title}</h1>
        </div>
    )
}

export default TitleWithBackButton