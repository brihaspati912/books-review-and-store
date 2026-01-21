import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Navigation } from 'swiper/modules';
import { getImgUrl } from '../../utilis/getImgUrl';

const news = [
    {
        id: 1,
        title: "Frankenstein Returns to the Big Screen After 200 Years",
        description:
            "Mary Shelley’s legendary novel 'Frankenstein' comes alive again in a bold new film adaptation, proving that great stories never age — they evolve.",
        image: "frankenstein.jpg"
    },
    {
        id: 2,
        title: "1984 Feels More Real Than Ever in the Digital Age",
        description:
            "George Orwell’s dystopian classic '1984' is trending again as readers draw chilling parallels between the novel’s world and modern digital surveillance.",
        image: "1984.jpeg"
    },
    {
        id: 3,
        title: "Dracula’s Shadow Rises With a Dark New Adaptation",
        description:
            "A fresh adaptation of Bram Stoker’s 'Dracula' revives gothic horror with modern storytelling, captivating both classic readers and new audiences.",
        image: "dracula.jpeg"
    },
    {
        id: 4,
        title: "Pride and Prejudice Gets a Stylish Modern Makeover",
        description:
            "Jane Austen’s timeless romance returns in a modern retelling that blends classic charm with contemporary elegance.",
        image: "pride.jpeg"
    },
    {
        id: 5,
        title: "Sherlock Holmes Proves Brilliance Never Goes Out of Style",
        description:
            "Arthur Conan Doyle’s iconic detective is back in the spotlight as new adaptations reignite global interest in classic mystery fiction.",
        image: "sherlock.jpeg"
    },
    {
        id: 6,
        title: "The Great Gatsby Shines Bright in a New Era",
        description:
            "F. Scott Fitzgerald’s 'The Great Gatsby' finds renewed relevance as modern readers connect with its themes of ambition, love, and illusion.",
        image: "gatsby.jpeg"
    }
];

export const News = () => {
    return (
        <div className="py-10">
            <h2 className="text-3xl font-semibold mb-6">News</h2>

            <Swiper
                navigation
                slidesPerView={1}
                spaceBetween={30}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 2 },
                    1184: { slidesPerView: 3 },
                }}
                modules={[Navigation]}
                className="mySwiper"
            >
                {news.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-12">

                            {/* Text */}
                            <div className="py-4">
                                <Link to={`/news/${item.id}`}>
                                    <h3 className="font-semibold text-lg">{item.title}</h3>
                                </Link>
                                <div className="w-10 h-[4px] bg-amber-300 mt-5"></div>
                                <p className="text-sm text-gray-600 py-2.5">
                                    {item.description}
                                </p>
                            </div>

                            {/* Image */}
                            <div className="flex-shrink-0">
                                <img
                                    src={getImgUrl(item.image)}
                                    alt={item.title}
                                    className="w-full bg-white shadow-lg rounded-lg object-cover hover:shadow-2xl transition"
                                    style={{ width: 200, height: 300 }}
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
