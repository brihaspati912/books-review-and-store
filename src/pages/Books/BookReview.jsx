import React, { useState } from "react";
import { useFetchAllBookReviewsQuery } from "../../redux/features/book-reviews/book-reviews.api";
import { Link } from "react-router-dom";
import { getImgUrl } from "../../utilis/getImgUrl";
///learn search book review functionality


// Swiper Carousel (correct imports for latest swiper)
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function BookReview() {
    const { data: reviews, isLoading, isError } = useFetchAllBookReviewsQuery();

    const [expandedReview, setExpandedReview] = useState({});
    const [search, setSearch] = useState("");

    const toggleReadMore = (id) => {
        setExpandedReview((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // 🔎 FIXED SEARCH FILTER (works now)
    const filteredReviews = reviews?.filter((review) => {
        const q = search.toLowerCase().trim();
        return (
            review?.title?.toLowerCase().includes(q) ||
            review?.author?.toLowerCase().includes(q) ||
            review?.review?.toLowerCase().includes(q)
        );
    });

    if (isLoading) return <div className="text-center py-10">Loading book reviews...</div>;
    if (isError) return <div className="text-center text-red-500">Error fetching book reviews.</div>;
    if (!reviews?.length) return <div className="text-center">No reviews found.</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold">All Book Reviews</h1>
                <Link to="/add-review">
                    <button className="bg-secondary text-black px-5 py-2 rounded-lg hover:bg-secondary-200 transition">
                        + Add Book Review
                    </button>
                </Link>
            </div>

            {/* 🔎 Search Bar */}
            <div className="mb-10">
                <input
                    type="text"
                    placeholder="Search by title, author or review..."
                    className="w-full px-4 py-2 border rounded-lg shadow"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* 🖼️ Featured Carousel */}
            <h2 className="text-2xl font-semibold mb-4">Featured Reviews</h2>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {reviews.slice(0, 6).map((review) => (
                    <SwiperSlide key={review._id}>
                        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-5">
                            <div className="w-full h-79 bg-gray-100 flex items-center justify-center rounded mb-4">
                                <img
                                    src={`../src/assets/${review.coverImage}`}
                                    alt={review.title}
                                    className="w-full h-56 rounded-md mb-4 object-contain "
                                />
                            </div>

                            <h3 className="text-lg font-semibold line-clamp-2">
                                {review.title}
                            </h3>
                            <p className="text-gray-600">{review.author}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* 📚 All Reviews */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">All Reviews</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Show no results message if search fails */}
                {filteredReviews?.length === 0 && (
                    <p className="text-center text-gray-500 col-span-full text-lg">
                        ❌ No results found for "<strong>{search}</strong>"
                    </p>
                )}

                {/* Display filtered reviews */}
                {filteredReviews?.map((review) => {
                    const expanded = expandedReview[review._id] || false;
                    const longText = review.review?.length > 250;
                    const visibleText = expanded
                        ? review.review
                        : review.review.substring(0, 250) + (longText ? "..." : "");

                    return (
                        <div key={review._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-5">
                            <img
                                //src={`../src/assets/${review.coverImage}`}
                                src={getImgUrl(review.coverImage)}
                                alt={review.title}
                                className="w-full h-56 rounded-md mb-4"
                            />

                            <h3 className="text-xl font-semibold">{review.title}</h3>
                            <p className="text-gray-600"><strong>Reviewer:</strong> {review.author}</p>

                            <p className="text-gray-600"><strong>Rating:</strong> ⭐{review.rating} / 5</p>

                            <p className="text-gray-700 mt-2 text-sm">{visibleText}</p>

                            {longText && (
                                <button
                                    onClick={() => toggleReadMore(review._id)}
                                    className="bg-secondary hover:underline mt-2"
                                >
                                    {expanded ? "Read Less ▲" : "Read More ▼"}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
