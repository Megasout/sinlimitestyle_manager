import { createBrowserRouter } from "react-router-dom";
import Layout, { loader as layoutLoader } from "./Components/Layout";
import Login, { loader as loginLoader, action as loginAction } from "./Pages/Login";
import Home from "./Pages/Home";
import Compras from "./Pages/Compras/Compras";
import Productos from "./Pages/Productos/Productos";
import Usuarios from "./Pages/Usuarios/Usuarios";
import Pagina from "./Pages/Pagina/Pagina";
import LayoutProductos from "./Components/LayoutProductos";
import LayoutPage from "./Components/LayoutPage";
import Colores, {loader as coloresLoader} from "./Pages/Productos/Colores";
import {action as deleteColor} from "./Components/ColorElement";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
        loader: loginLoader,
        action: loginAction
    },
    {
        path: '/',
        element: <Layout />,
        loader: layoutLoader,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/Compras',
                element: <Compras />
            },
            {
                path: '/Usuarios',
                element: <Usuarios />
            }
        ]
    },
    {
        path: '/Productos',
        element: <LayoutProductos />,
        loader: layoutLoader,
        children: [
            {
                index: true,
                element: <Productos />
            },
            {
                path:'Colores',
                element: <Colores/>,
                loader: coloresLoader
            },
            {
                path:'Colores/:ID/delete',
                action: deleteColor
            }
        ]
    },
    {
        path: '/Pagina',
        element: <LayoutPage />,
        loader: layoutLoader,
        children: [
            {
                index: true,
                element: <Pagina />
            }
        ]
    }
])

export default router