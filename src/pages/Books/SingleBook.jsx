
import { useParams } from "react-router-dom";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useFetchBookByIdQuery } from "../../redux/features/books/books.api";

export default function SingleBook() {

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    const { id } = useParams();
    console.log("BOOK ID FROM URL:", id);

    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
    console.log("FETCHED BOOK:", book);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading book</div>;

    const dispatch = useDispatch();

    if (!book) return null;

    const handleAddToCart = () => {
        dispatch(addToCart(book));
    };




    return (
        <>

            { /*<div>
                <h1>Single Book</h1>
                <h2>{book.title}</h2>
                <p>{book.description}</p>
            </div>*/}



            <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                {/* Book Image */}
                <div className="h-64 w-full bg-gray-100 flex items-center justify-center">
                    <img
                        src={`../src/assets/${book.coverImage}`}
                        alt={book.title}
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Book Info */}
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h2>
                    <p className="text-gray-600 mb-4">
                        {book.description.length > 100
                            ? `${book.description.slice(0, 100)}...`
                            : book.description}
                    </p>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-lg font-semibold text-blue-600">
                            ${book.newPrice}
                        </span>
                        {book.oldPrice && (
                            <span className="line-through text-gray-400">${book.oldPrice}</span>
                        )}
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-all duration-200"
                    >
                        <FiShoppingCart size={20} />
                        Add to Cart
                    </button>
                </div>
            </div>

        </>

    );
}
