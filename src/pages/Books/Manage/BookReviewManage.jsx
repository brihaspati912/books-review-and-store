import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    useDeleteBookReviewMutation,
    useFetchAllBookReviewsQuery
} from '../../../redux/features/book-reviews/book-reviews.api';

const BookReviewManage = () => {
    const navigate = useNavigate();

    // Fetch all book reviews
    const { data: bookReviews = [], refetch, isLoading, isError } = useFetchAllBookReviewsQuery();

    const [deleteBookReview] = useDeleteBookReviewMutation();

    // Handle deleting a book review
    const handleDeleteBookReview = async (id) => {
        if (!window.confirm('Are you sure you want to delete this book review?')) return;

        try {
            await deleteBookReview(id).unwrap();
            alert('Book review deleted successfully!');
            refetch(); // Refresh the list
        } catch (error) {
            console.error('Failed to delete book review:', error);
            alert('Failed to delete book review. Please try again.');
        }
    };

    if (isLoading) return <p className="text-center py-10">Loading book reviews...</p>;
    if (isError) return <p className="text-center py-10 text-red-500">Failed to load book reviews.</p>;

    return (
        <section className="py-1 bg-blueGray-50">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="rounded-t mb-0 px-4 py-3 border-0 flex justify-between items-center">
                        <h3 className="font-semibold text-base text-blueGray-700">All Books Reviews</h3>
                        <button
                            className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded transition-all duration-150"
                            onClick={() => refetch()}
                        >
                            Refresh
                        </button>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-xs uppercase font-semibold text-left text-blueGray-500 border-b border-blueGray-100">#</th>
                                    <th className="px-6 py-3 text-xs uppercase font-semibold text-left text-blueGray-500 border-b border-blueGray-100">Book Title</th>
                                    <th className="px-6 py-3 text-xs uppercase font-semibold text-left text-blueGray-500 border-b border-blueGray-100">Category</th>
                                    <th className="px-6 py-3 text-xs uppercase font-semibold text-left text-blueGray-500 border-b border-blueGray-100">Price</th>
                                    <th className="px-6 py-3 text-xs uppercase font-semibold text-left text-blueGray-500 border-b border-blueGray-100">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {bookReviews.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-blueGray-700">No book reviews found.</td>
                                    </tr>
                                ) : (
                                    bookReviews.map((bookReview, index) => (
                                        <tr key={bookReview._id}>
                                            <td className="px-6 py-4 text-xs text-blueGray-700">{index + 1}</td>
                                            <td className="px-6 py-4 text-xs">{bookReview.title}</td>
                                            <td className="px-6 py-4 text-xs">{bookReview.category}</td>
                                            <td className="px-6 py-4 text-xs">₨{bookReview.newPrice}</td>
                                            <td className="px-6 py-4 text-xs space-x-2">
                                                <Link
                                                    to={`/dashboard/edit-book-review/${bookReview._id}`}
                                                    className="text-indigo-600 hover:text-indigo-700 hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteBookReview(bookReview._id)}
                                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                                                >
                                                    Delete
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

export default BookReviewManage;
