import React from 'react';
import { useFetchAllBookReviewsQuery } from '../../redux/features/book-reviews/book-reviews.api';

export default function BookReview() {
    const { data: reviews, isLoading, isError } = useFetchAllBookReviewsQuery();

    if (isLoading) return <div>Loading book reviews...</div>;
    if (isError) return <div>Error fetching book reviews.</div>;
    if (!reviews || reviews.length === 0) return <div>No reviews found.</div>;

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">All Book Reviews</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review) => (

                    <div key={review._id} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
                        <img src={`../assets/${review.coverImage}`} alt={review.title || "Book Cover"} />
                        <h2 className="font-semibold text-lg mb-1">{review.title || "Untitled Book"}</h2>
                        <p className="text-gray-600 mb-2"><strong>Reviewer:</strong> {review.author || "Anonymous"}</p>
                        <p className="text-gray-600 mb-2"><strong>Rating:</strong> {review.rating || 0} / 5</p>
                        <p className="text-gray-700">{review.review}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
