import { createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";
import Login, {loader as loginLoader, action as loginAction} from "./Pages/Login";
import Home from "./Pages/Home";

const router = createBrowserRouter([
    {
        path: '/',
        element:<Login/>,
        loader: loginLoader,
        action: loginAction
    },
    {
        path: '/home',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Home/>
            }
        ]
    }
])

export default router