import { useEffect, useState } from "react"
import React from 'react'
import { BookCard } from "../Books/BookCard";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';


const categories = ["Choose a Genre", "Horror", "Adventure", "Biography", "Dystopia"]

export const TopSeller = ({ book }) => {
    {/* Understand this code how to will  fetch value from onClick of the select category
         const [selectedCategory, setselectedCategory] = useState("Choose a Genre");

    const filteredBooks = selectedCategory === "Choose a Genre" ? books : books.filter(book =>book.category === selectedCategory.toLowerCase())

    <div className="mb-8 flex items-center">
                <select name="category" id="category" className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none" onChange={(e) => setSelectedCategory(e.target.value)}>

    console.log(selectedCategory)
        */}
    const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Choose a Genre");

    useEffect(() => {
        fetch("books.json").then(res => res.json()).then(data => setBooks(data))
    }, [])


    const filteredBooks = selectedCategory === "Choose a Genre" ? books : books.filter(book => book.category === selectedCategory.toLowerCase())



    return (
        <div className="py-10">
            <h2 className="text-3xl font-semibold mb-6"> Top Sellers</h2>

            {/* category filtering*/}
            <div className="mb-8 flex items-center">
                <select name="category" id="category" className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none" onChange={(e) => setSelectedCategory(e.target.value)}>
                    {
                        categories.map((category, index) => (
                            <option value={category} key={index}>{category}</option>
                        ))
                    }
                </select>
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
                    filteredBooks.length > 0 &&
                    filteredBooks.map((book, index) => (
                        <SwiperSlide key={index} ><BookCard book={book} /></SwiperSlide>


                    ))}


            </Swiper>




        </div>
    )
}
