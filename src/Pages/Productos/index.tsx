import { RouteObject } from "react-router-dom";
import Productos from "./Productos";
import { loader as layoutLoader } from "../../Components/Layout";
import LayoutProductos from "../../Components/LayoutProductos";
import Colores, { loader as coloresLoader } from "./Colores";
import { action as deleteColor } from "../../Components/ColorElement";
import Talles from "./Talles";
import Categorias, {loader as categoriasLoader} from "./Categorias";

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
            element: <Talles/>
        },
        {
            path: 'Categorias',
            element: <Categorias/>,
            loader: categoriasLoader
        }
    ]
}


export default productosRoute
