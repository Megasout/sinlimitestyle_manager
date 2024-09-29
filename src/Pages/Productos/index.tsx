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
import Prendas, { loader as prendasLoader } from "./Prendas";
import PrendasAdd from "./PrendasAdd";
import PrendasEdit, { loader as prendaEditLoader } from "./PrendasEdit";
import PrendaTalle, { loader as prendaTalleLoader, action as deletePrendaTalle } from "./PrendaTalle";
import PrendaImagenes from "./PrendaImagenes";
import PrendaColores from "./PrendaColores";

const productosRoute: RouteObject =
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
            element: <PrendaColores />
        },
        {
            path: 'Prendas/:ID/edit/imagenes',
            element: <PrendaImagenes />
        }
    ]
}


export default productosRoute
