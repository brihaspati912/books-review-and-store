import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../App.css';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



import { Autoplay, Pagination, Navigation } from 'swiper/modules';




export default function SwiperBooks() {



    return (
        <>
            <div className="home__image">
                <div className="home__swiper swiper">
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
                        <div className='swiper-wrapper '>
                            <SwiperSlide> <article className="home__artical ">
                                <img src="..\src\assets\dracula-2.jpeg" alt="dracula" />
                            </article></SwiperSlide>



                            <SwiperSlide> <article className="home__artical ">
                                <img src="..\src\assets\1984.jpeg" alt="dracula" />
                            </article></SwiperSlide>
                            <SwiperSlide> <article className="home__artical ">
                                <img src="..\src\assets\animal-farm.jpeg" alt="dracula" />
                            </article></SwiperSlide>
                            <SwiperSlide> <article className="home__artical ">
                                <img src="..\src\assets\book-theif-1.jpeg" alt="dracula" />
                            </article></SwiperSlide>

                            <SwiperSlide> <article className="home__artical ">
                                <img src="..\src\assets\20000-leagues.jpeg" alt="dracula" />
                            </article></SwiperSlide>
                        </div>
                    </Swiper>
                </div>
            </div>
        </>
    )
}
