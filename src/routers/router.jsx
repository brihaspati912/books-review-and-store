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
import BookReviewManage from "../pages/Books/Manage/BookReviewManage";
import BookManage from "../pages/Books/Manage/BookManage";
import AddBook from "../pages/Dashboard/addBook/AddBook";
import AddBookReview from "../pages/Books/Manage/AddBookReview/AddBookReview";
import AddBookReviewUser from "../pages/Books/AddBookReviewUser/AddBookReviewUser"
import UpdateBook from "../pages/Dashboard/editBook/UpdateBook";
import UpdateBookReview from "../pages/Dashboard/editBookReview/UpdateBookReview";


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
                path: "/add-review",
                element: <PrivateRoute><AddBookReviewUser /></PrivateRoute>
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
                element: <AdminRoute><div>Dashboard Layout</div></AdminRoute>
            },

            {
                path: "add-new-book",
                element: <AdminRoute><AddBook /></AdminRoute>
            },
            {
                path: "add-new-book-review",
                element: <AdminRoute><AddBookReview
                /></AdminRoute>
            },
            {
                path: "manage-books",
                element: <AdminRoute><BookManage /></AdminRoute>
            },
            {
                path: "manage-book-reviews",
                element: <AdminRoute><BookReviewManage /></AdminRoute>
            },
            {
                path: "edit-book/:id",
                element: <AdminRoute><UpdateBook /></AdminRoute>
            },
            {
                path: "edit-book-review/:id",
                element: <AdminRoute><UpdateBookReview /></AdminRoute>
            },

            {
                path: "delete-book/:id",
                element: <AdminRoute> <div>Dashboard Layout</div></AdminRoute>
            }
        ]

    }
]);

export default router;
