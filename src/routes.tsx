import { createBrowserRouter } from "react-router-dom";
import Layout, { loader as layoutLoader } from "./Components/Layout";
import Login, { loader as loginLoader, action as loginAction } from "./Pages/Login";
import Home from "./Pages/Home";
import Compras from "./Pages/Compras/Compras";
import Usuarios from "./Pages/Usuarios/Usuarios";
import Pagina from "./Pages/Pagina/Pagina";
import LayoutPage from "./Components/LayoutPage";
import productosRoute from "./Pages/Productos";
import ErrorPage from "./Pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
        loader: loginLoader,
        action: loginAction,
        errorElement: <ErrorPage/>
    },
    {
        path: '/',
        element: <Layout />,
        loader: layoutLoader,
        errorElement: <ErrorPage/>,
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
    productosRoute,
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