import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import { Home } from "../pages/home/Home";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import Cart from "../pages/Books/CartPage";
import CheckOutPage from "../pages/Books/CheckOutPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/orders",
                element: <div>Order Page</div>
            },
            {
                path: "/about",
                element: <div>About Page</div>
            },
            {
                path: "/login",
                element: <Login />
            }
            ,
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/cart",
                element: <Cart />
            }, {
                path: "/checkout",
                element: <CheckOutPage />
            }
        ]
    },
]);

export default router;
