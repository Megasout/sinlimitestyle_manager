import { useRef } from "react"
import { Link } from "react-router-dom"

type SideMenuBType = {
    link: string,
    text: string,
    icon: string
}

function SideMenu_Button(props: SideMenuBType) {
    const { link, text, icon } = props
    const linkRef = useRef<HTMLAnchorElement>(null)

    const handleOnClick = () => {
        linkRef.current?.click()
    }

    return (
        <div className="side_menu_button" onClick={handleOnClick}>
            <i className={icon}></i>
            <Link ref={linkRef} to={link}>{text}</Link>
        </div>
    )
}

export default SideMenu_Button