import React from 'react';

import { Link } from 'react-router-dom';
import { FaBarsStaggered } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
    return (
        <header className="max-w-screen-2xl mx-auto px-4 py-6">
            <nav className='flex justify-around items-center'>
                {/*left side */}
                <div className='flex items-center md:gap-16 gap-4'>
                    <Link to="/"><FaBarsStaggered className='size-6' /></Link>

                    <div className='relative sm:w-72 w-40 space:x-2'>
                        <FaSearch className='absolute inline-block  left-2 inset-y-2' />
                        <input type="text" placeholder='Search' className='border bg-[#EAEAEA] w-full  rounded-md px-6 py-1 md:px-8 focus:outline-none  ' />
                    </div>
                </div>



                {/*right side */}
                <div className='relative flex items-center sm:space-x-3 space-2 text-2xl'>
                    <CiUser className='size-6' />
                    <CiHeart className='size-6' />
                    <button className='hidden sm-block'><CiHeart className='size-6' /></button>
                    <Link to="/cart" className='bg-secondary 
                     p-1 sm-px-6 px-2 flex items-center rounded-sm'><FaShoppingCart />
                        <span className='text-sm font-semibold sm:ml-1'>0</span></Link>
                </div>
            </nav>
        </header>
    )
}
