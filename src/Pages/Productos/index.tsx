import { RouteObject } from "react-router-dom";
import ProductosText from "./ProductosText";
import { loader as layoutLoader } from "../../Components/Layout";
import LayoutProductos from "../../Components/LayoutProductos";
import Talles, { loader as tallesLoader } from "./Talles";
import Categorias, { loader as categoriasLoader } from "./Categorias";
import { action as deleteCategoria } from "../../Components/Productos/CategoriaElement"
import TallesEdit, { loader as tallesByCategoriaLoader } from "./TallesEdit";
import { action as deleteTalle } from "../../Components/Productos/TalleEditElement"

import ErrorPage from "../ErrorPage";

import ProductoAdd, {loader as productoAddLoader} from "./Items/ProductoAdd";
import ProductosEdit, {loader as productoEditLoader} from "./Items/ProductosEdit";
import Productos, {loader as productosLoader} from "./Items/Productos";
import ProductoImagenes, {loader as productoImagenesLoader} from "./Items/ProductoImagenes";
import ProductoTalle, {loader as productoTalleLoader, action as deleteProductoTalle} from "./Items/ProductoTalle";

const prendasRoute: RouteObject[] = [
    {
        path: ':TYPE',
        element: <Productos />,
        loader: productosLoader
    },
    {
        path: ':TYPE/add',
        element: <ProductoAdd />,
        loader: productoAddLoader
    },
    {
        path: ':TYPE/:ID/edit',
        element: <ProductosEdit />,
        loader: productoEditLoader,
    },
    {
        path: ':TYPE/:ID/edit/talles',
        element: <ProductoTalle />,
        loader: productoTalleLoader,
    },
    {
        path: ':TYPE/:ID/edit/talles/:TALLEID/delete',
        action: deleteProductoTalle
    },
    {
        path: ':TYPE/:ID/edit/imagenes',
        element: <ProductoImagenes />,
        loader: productoImagenesLoader
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
            element: <ProductosText />
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
    ]
}


export default productosRoute