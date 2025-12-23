import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import { Home } from "../pages/home/Home";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import Cart from "../pages/Books/CartPage";
import CheckOutPage from "../pages/Books/CheckOutPage";
import SingleBook from "../pages/Books/SingleBook";

import BookReview from "../pages/Books/BookReview";
import PrivateRoute from "./PrivateRoute";

import Orders from "../pages/Books/Orders";

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
            },
            {
                path: "/reviews",
                element: <BookReview />
            },
            {
                path: "/checkout",
                element: <PrivateRoute><CheckOutPage /></PrivateRoute>
            },
            {
                path: "/orders",
                element: <PrivateRoute><Orders /></PrivateRoute>
            },
            {
                path: "/books/:id",
                element: <SingleBook />
            }
        ]
    },
]);

export default router;
