export default LayoutPage

import { Outlet } from "react-router-dom"
import "../Styles/layout.scss"
import SideMenu_Button from "./SideMenu_Button"

function LayoutPage() {
    return (
        <div className="layout">
            <div className="side_menu">
                <div className="navigation">
                    <h1>SinLimiteStyle</h1>
                    <nav>
                        <SideMenu_Button link="/" text="Home" icon="fa-solid fa-house" />
                        <div className="line"></div>
                        <SideMenu_Button link="Banner" text="Banner" icon="fa-solid fa-pen-nib" />
                        <SideMenu_Button link="PRecomendados" text="Lista Prendas" icon="fa-solid fa-p" />
                        <SideMenu_Button link="ARecomendados" text="Lista Accesorios" icon="fa-solid fa-a" />
                        <SideMenu_Button link="Colecciones" text="Colecciones" icon="fa-solid fa-c" />
                    </nav>
                </div>
            </div>
            <div className="page">
                <Outlet />
            </div>
        </div>
    )
}