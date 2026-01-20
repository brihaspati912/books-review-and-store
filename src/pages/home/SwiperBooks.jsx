import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../App.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Static imports for all images
import dracula from '../../assets/dracula-2.jpeg';
import doriangrey from '../../assets/doriangrey.webp';
import odyssey from '../../assets/odyssey.jpeg';
import nineteen84 from '../../assets/1984.jpeg';
import animalFarm from '../../assets/animal-farm.jpeg';

export default function SwiperBooks() {
    const images = [dracula, doriangrey, odyssey, nineteen84, animalFarm];

    return (
        <div className="home__image">
            <div className="home__swiper swiper">
                <h1><b>Read Now!</b></h1>
                <Swiper
                    slidesPerView={3}
                    centeredSlides={false}
                    spaceBetween={0}
                    grabCursor={true}
                    loop={true}
                    autoplay={{
                        delay: 2400,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <article className="home__artical">
                                <img src={img} alt={`book-${index}`} />
                            </article>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
