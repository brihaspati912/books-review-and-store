import React from 'react'
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import { BookCard } from '../Books/BookCard';


export const Recommended = () => {

    const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Choose a Genre");



    useEffect(() => {
        fetch("books.json").then(res => res.json()).then(data => setBooks(data))
    }, [])
    return (
        <><div className="py-10">
            <div>
                <h2 className="text-3xl font-semibold mb-6 ">Recommended </h2>
            </div>

            <Swiper navigation={true}
                slidesPerView={1}
                spaceBetween={30}

                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1184: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }}
                modules={[Navigation]}
                className="mySwiper"
            >
                {
                    books.length > 0 &&
                    books.map((book, index) => (
                        <SwiperSlide key={index} ><BookCard book={book} /></SwiperSlide>


                    ))}


            </Swiper>
        </div>
        </>

    )
}
