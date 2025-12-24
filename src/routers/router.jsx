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
import DashBoardLayOut from "../pages/Dashboard/DashBoardLayOut";

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
                element: <PrivateRoute><BookReview /></PrivateRoute>
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
        element: <AdminRoute><DashBoardLayOut /></AdminRoute>,
        children: [
            {
                path: " ",
                element: <div>Dashboard Layout</div>
            },
            {
                path: "add-new-book",
                element: <div>Dashboard Layout</div>
            },
            {
                path: "edit-book/:id",
                element: <div>Dashboard Layout</div>
            },
            {
                path: "delete-book/:id",
                element: <div>Dashboard Layout</div>
            }
        ]

    }
]);

export default router;
