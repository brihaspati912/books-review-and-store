import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../App.css';
import { getImgUrl } from '../../utilis/getImgUrl';

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
        <>
            <div className="home__image">
                <div className="home__swiper swiper">
                    <h1 className=''><b>Read Now!</b></h1>
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

                                <img src={getImgUrl("dracula-2.jpeg")} alt="dracula" />
                            </article></SwiperSlide>
                            <SwiperSlide> <article className="home__artical ">
                                <img src={getImgUrl("doriangrey.webp")} alt="dracula" />
                            </article></SwiperSlide>
                            <SwiperSlide> <article className="home__artical ">
                                <img src={getImgUrl("odyssey.jpeg")} alt="dracula" />
                            </article></SwiperSlide>


                            <SwiperSlide> <article className="home__artical ">
                                <img src={getImgUrl("1984.jpeg")} alt="dracula" />
                            </article></SwiperSlide>
                            <SwiperSlide> <article className="home__artical ">
                                <img src={getImgUrl("animal-farm.jpeg")} alt="dracula" />
                            </article></SwiperSlide>


                        </div>
                    </Swiper>
                </div>
            </div>
        </>
    )
}
