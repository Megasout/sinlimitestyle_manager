import {Outlet, redirect } from "react-router-dom"
import "../Styles/layout.scss"
import SideMenu_Button from "./SideMenu_Button"
import { isTokenValid } from "../Models/token"

export async function loader() {
    const token = await isTokenValid()

    if (!token.value) {
        return redirect('/')
    }

    return token
}

function Layout() {
    return (
        <div className="layout">
            <div className="side_menu">
                <div className="navigation">
                    <h1>SinLimiteStyle</h1>
                    <nav>
                        <SideMenu_Button link="/Pagina" text="Pagina" icon="fa-solid fa-gear"/>
                        <SideMenu_Button link="/Productos" text="Productos" icon="fa-solid fa-store"/>
                        <SideMenu_Button link="/Compras" text="Compras" icon="fa-solid fa-bag-shopping"/>
                        <SideMenu_Button link="/Usuarios" text="Usuarios" icon="fa-solid fa-users"/>
                    </nav>
                </div>
            </div>
            <div className="page">
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout