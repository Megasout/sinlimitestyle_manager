export default LayoutProductos

import { Outlet } from "react-router-dom"
import "../Styles/layout.scss"
import SideMenu_Button from "./SideMenu_Button"

function LayoutProductos() {
    return (
        <div className="layout">
            <div className="side_menu">
                <div className="navigation">
                    <h1>SinLimiteStyle</h1>
                    <nav>
                        <SideMenu_Button link="/" text="Home" icon="fa-solid fa-house" />
                        <div className="line"></div>
                        <SideMenu_Button link="Accesorios" text="Accesorios" icon="fa-solid fa-a" />
                        <SideMenu_Button link="Prendas" text="Prendas" icon="fa-solid fa-p" />
                        <SideMenu_Button link="Categorias" text="Categorias" icon="fa-solid fa-c" />
                        <SideMenu_Button link="Talles" text="Talles" icon="fa-solid fa-t" />
                        <SideMenu_Button link="Colores" text="Colores" icon="fa-solid fa-droplet" />
                    </nav>
                </div>
            </div>
            <div className="page">
                <Outlet />
            </div>
        </div>
    )
}