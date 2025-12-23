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
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";

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
    {
        path: "/admin",
        element: <AdminLogin />
    },

    {
        path: "/dashboard",
        element: <AdminRoute><div>Dashboard Layout</div></AdminRoute>,
        children: [
            {
                path: " ",
                element: <AdminRoute><div>Dashboard Layout</div></AdminRoute>
            },
            {
                path: "add-new-book",
                element: <AdminRoute><div>Dashboard Layout</div></AdminRoute>
            },
            {
                path: "edit-book/:id",
                element: <AdminRoute><div>Dashboard Layout</div></AdminRoute>
            },
            {
                path: "delete-book/:id",
                element: <AdminRoute><div>Dashboard Layout</div></AdminRoute>
            }
        ]

    }
]);

export default router;
