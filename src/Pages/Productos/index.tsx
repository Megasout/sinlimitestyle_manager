import { RouteObject } from "react-router-dom";
import Productos from "./Productos";
import { loader as layoutLoader } from "../../Components/Layout";
import LayoutProductos from "../../Components/LayoutProductos";
import Colores, { loader as coloresLoader } from "./Colores";
import { action as deleteColor } from "../../Components/Productos/ColorElement";
import Talles, { loader as tallesLoader } from "./Talles";
import Categorias, { loader as categoriasLoader } from "./Categorias";
import { action as deleteCategoria } from "../../Components/Productos/CategoriaElement"
import TallesEdit, { loader as tallesByCategoriaLoader } from "./TallesEdit";
import { action as deleteTalle } from "../../Components/Productos/TalleEditElement"

import Prendas, { loader as prendasLoader } from "./Prendas/Prendas";
import PrendasAdd from "./Prendas/PrendasAdd";
import PrendasEdit, { loader as prendaEditLoader } from "./Prendas/PrendasEdit";
import PrendaTalle, { loader as prendaTalleLoader, action as deletePrendaTalle } from "./Prendas/PrendaTalle";
import PrendaImagenes, { loader as prendaImagenesLoader } from "./Prendas/PrendaImagenes";
import PrendaColores, { loader as prendaColoresLoader, action as deletePrendaColor } from "./Prendas/PrendaColores";

import Accesorios, { loader as accesoriosLoader } from "./Accesorios/Accesorios"
import AccesoriosAdd from "./Accesorios/AccesoriosAdd";
import AccesoriosEdit, { loader as accesorioEditLoader } from "./Accesorios/AccesoriosEdit";
import AccesorioTalle, { loader as accesorioTalleLoader, action as deleteAccesorioTalle } from "./Accesorios/AccesorioTalles";
import AccesorioColores, {loader as accesorioColoresLoader, action as deleteAccesorioColor} from "./Accesorios/AccesorioColores";
import AccesorioImagenes, {loader as accesorioImagenesLoader} from "./Accesorios/AccesorioImagenes";
import ErrorPage from "../ErrorPage";

const prendasRoute: RouteObject[] = [
    {
        path: 'Prendas',
        element: <Prendas />,
        loader: prendasLoader
    },
    {
        path: 'Prendas/add',
        element: <PrendasAdd />,
        loader: prendasLoader
    },
    {
        path: 'Prendas/:ID/edit',
        loader: prendaEditLoader,
        element: <PrendasEdit />
    },
    {
        path: 'Prendas/:ID/edit/talles',
        element: <PrendaTalle />,
        loader: prendaTalleLoader,
    },
    {
        path: 'Prendas/:ID/edit/talles/:TALLEID/delete',
        action: deletePrendaTalle
    },
    {
        path: 'Prendas/:ID/edit/colores',
        element: <PrendaColores />,
        loader: prendaColoresLoader
    },
    {
        path: 'Prendas/:ID/edit/colores/:COLORID/delete',
        action: deletePrendaColor
    },
    {
        path: 'Prendas/:ID/edit/imagenes',
        element: <PrendaImagenes />,
        loader: prendaImagenesLoader
    }
]

const accesoriosRoute: RouteObject[] = [
    {
        path: 'Accesorios',
        element: <Accesorios />,
        loader: accesoriosLoader
    },
    {
        path: 'Accesorios/add',
        element: <AccesoriosAdd />,
        loader: accesoriosLoader
    },
    {
        path: 'Accesorios/:ID/edit',
        loader: accesorioEditLoader,
        element: <AccesoriosEdit />
    },
    {
        path: 'Accesorios/:ID/edit/talles',
        element: <AccesorioTalle />,
        loader: accesorioTalleLoader,
    },
    {
        path: 'Accesorios/:ID/edit/talles/:TALLEID/delete',
        action: deleteAccesorioTalle
    },
    {
        path: 'Accesorios/:ID/edit/colores',
        element: <AccesorioColores />,
        loader: accesorioColoresLoader
    },
    {
        path: 'Accesorios/:ID/edit/colores/:COLORID/delete',
        action: deleteAccesorioColor
    }, 
    {
        path: 'Accesorios/:ID/edit/imagenes',
        element: <AccesorioImagenes />,
        loader: accesorioImagenesLoader
    }
]

const productosRoute: RouteObject =
{
    path: '/Productos',
    element: <LayoutProductos />,
    loader: layoutLoader,
    errorElement: <ErrorPage/>,
    children: [
        {
            index: true,
            element: <Productos />
        },
        {
            path: 'Colores',
            element: <Colores />,
            loader: coloresLoader
        },
        {
            path: 'Colores/:ID/delete',
            action: deleteColor
        },
        {
            path: 'Talles',
            element: <Talles />,
            loader: tallesLoader,
        },
        {
            path: 'Talles/:ID/edit',
            element: <TallesEdit />,
            loader: tallesByCategoriaLoader
        },
        {
            path: 'Talles/:IDCategoria/:ID/delete',
            action: deleteTalle
        },
        {
            path: 'Categorias',
            element: <Categorias />,
            loader: categoriasLoader
        },
        {
            path: 'Categorias/:ID/delete',
            action: deleteCategoria
        },
        ...prendasRoute,
        ...accesoriosRoute
    ]
}


export default productosRoute