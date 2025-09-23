import React from 'react';
import banner from '../../assets/banner.png';

//import { BookRight } from './BookRight';
import SwiperBooks from './SwiperBooks';


export const Banner = () => {
    return (


        <div className='flex flex-col md:flex-row-reverse  items-center  justify-between gap-12 py-12'>

            <div className='md:w-1/2 w-full flex md:justify-end items-center '>

                <SwiperBooks />

            </div>





            <div className='md:w-1/2 w-full'>
                <h1 className='md:text-5xl text-2xl font-medium mb-7'>New Release This Week</h1>
                <p className="mb-10">Discover Your Next Great Read – At<b> Book And The Reviews</b>, we believe that every book holds the power to inspire, transform, and transport you to new worlds. Whether you're a fan of gripping thrillers, heartwarming romances, epic fantasies, or thought-provoking non-fiction, our curated collection has something for every kind of reader. Dive into expertly written reviews, stay updated on the latest bestsellers, and enjoy seamless shopping all in one place. Let your next favorite book find you.</p>

                <button className=' w-auto bg-primary my-4 px-12 py-2 rounded-md text-base font-secondary font-bold hover:bg-secondary hover:text-white transition-all duration-200 cursor-pointer'>Reviews</button>

            </div>


        </div>


        /*
                <div className='flex sm:flex-col md:flex-row py-1 gap-12 justify-between items-center '>
                    
                    <div className='md:w-1/2 w-full'>
                        <h1 className='md:text-5xl text-2xl font-medium mb-7'>New Release This Week</h1>
                        <p className="mb-10 max-w-full ">Discover Your Next Great Read – At<b> Book And The Reviews</b>, we believe that every book holds the power to inspire, transform, and transport you to new worlds. Whether you're a fan of gripping thrillers, heartwarming romances, epic fantasies, or thought-provoking non-fiction, our curated collection has something for every kind of reader. Dive into expertly written reviews, stay updated on the latest bestsellers, and enjoy seamless shopping all in one place. Let your next favorite book find you.</p>
        
                        <button className=' w-auto bg-primary my-4 px-12 py-2 rounded-md text-base font-secondary font-bold hover:bg-secondary hover:text-white transition-all duration-200 cursor-pointer'>Reviews</button>
        
                    </div>
                   
                    <div className='md:w-1/2  w-full flex md:justify-end items-center '>
                        <img src={banner} alt="" />
                    </div>
        
                </div>
        
        
        
        
        
        
        */


    )
}
