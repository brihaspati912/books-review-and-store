import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    useDeleteBookMutation,
    useFetchAllBooksQuery
} from '../../../redux/features/books/books.api';

const BookManage = () => {
    const navigate = useNavigate();

    const {
        data: books = [],
        isLoading,
        isError,
        refetch
    } = useFetchAllBooksQuery();

    const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

    // Delete book
    const handleDeleteBook = async (id) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this book?'
        );

        if (!confirmDelete) return;

        try {
            await deleteBook(id).unwrap();
            alert('Book deleted successfully!');
            refetch();
        } catch (error) {
            console.error('Failed to delete book:', error);
            alert('Failed to delete book. Please try again.');
        }
    };

    // Navigate to edit page
    const handleEditClick = (id) => {
        navigate(`/dashboard/edit-book/${id}`);
    };

    if (isLoading) {
        return (
            <div className="text-center mt-20 text-lg font-semibold">
                Loading books...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center mt-20 text-red-500 font-semibold">
                Failed to load books.
            </div>
        );
    }

    return (
        <section className="py-1 bg-blueGray-50">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">
                                    All Books
                                </h3>
                            </div>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <button
                                    onClick={refetch}
                                    className="bg-indigo-500 text-white text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                                >
                                    Refresh
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-xs uppercase font-semibold text-left">
                                        #
                                    </th>
                                    <th className="px-6 py-3 text-xs uppercase font-semibold text-left">
                                        Book Title
                                    </th>
                                    <th className="px-6 py-3 text-xs uppercase font-semibold text-left">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-xs uppercase font-semibold text-left">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-xs uppercase font-semibold text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {books.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center py-6 text-gray-500"
                                        >
                                            No books found.
                                        </td>
                                    </tr>
                                ) : (
                                    books.map((book, index) => (
                                        <tr key={book._id}>
                                            <td className="px-6 py-4 text-sm">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                {book.title}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                {book.category}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                ₨{book.newPrice}
                                            </td>
                                            <td className="px-6 py-4 text-sm space-x-4">
                                                <button
                                                    onClick={() =>
                                                        handleEditClick(book._id)
                                                    }
                                                    className="text-indigo-600 hover:underline font-medium"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleDeleteBook(book._id)
                                                    }
                                                    disabled={isDeleting}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full disabled:opacity-50"
                                                >
                                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookManage;
