import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { BookCard } from "../Books/BookCard";
import { useFetchAllBooksQuery } from "../../redux/features/books/books.api";

export const Recommended = () => {
    const { data: books = [], isLoading } = useFetchAllBooksQuery();

    if (isLoading) return null;

    const recommendedBooks = books.slice(0, 6); // IMPORTANT

    return (
        <div className="py-10">
            <h2 className="text-3xl font-semibold mb-6">Recommended</h2>

            <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={
                    recommendedBooks.length > 3
                        ? {
                            delay: 2500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }
                        : false
                }
                loop={recommendedBooks.length > 3}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {recommendedBooks.map((book) => (
                    <SwiperSlide key={book._id}>
                        <BookCard book={book} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
