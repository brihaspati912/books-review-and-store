import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { FaBarsStaggered } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import user from "../assets/user.jpg";

const navigation = [
    {
        name: "Dashboard", href: "/dashboard"
    },
    {
        name: "Orders", href: "/orders"
    },
    {
        name: "Cart Page", href: "/cart-page"
    },
    {
        name: "Logout", href: "/logout"
    }
]


export default function Navbar() {

    const currentUser = true;
    const [isdropDownOpen, setisdropDownOpen] = useState(false);
    console.log(isdropDownOpen)



    return (
        <header className="max-w-screen-2xl mx-auto px-4 py-6">
            <nav className='flex justify-between px-6 items-center'>
                {/*left side */}
                <div className='flex items-center md:gap-16 gap-4'>
                    <Link to="/"><FaBarsStaggered className='size-7' /></Link>

                    <div className='relative sm:w-72 w-40 space:x-2'>
                        <FaSearch className='absolute inline-block   left-2 inset-y-2' />
                        <input type="text" placeholder='Search' className='border bg-[#EAEAEA] w-full  rounded-md px-6 py-1 md:px-8 focus:outline-none  ' />
                    </div>
                </div>



                {/*right side */}
                <div className='relative flex items-center sm:space-x-3 space-2 text-2xl'>
                    <div>
                        {
                            currentUser ?
                                <><button onClick={() => { setisdropDownOpen(!isdropDownOpen) }}><img src={user} alt="" className={`size-7 rounded-full my-1
                                ${currentUser ? "ring-2 ring-yellow-500" : ""}
                                `} /></button>
                                    {/* Show drodowns*/}
                                    {isdropDownOpen && (
                                        <div className='absolute mt-2 w-48 right-0 bg-white shadow-lg rounded-md  z-40 '>
                                            <ul className='py-2'>
                                                {navigation.map((item) => (
                                                    <li key={item.name} onClick={() => setisdropDownOpen(false)}>
                                                        <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-grey-100'>{item.name}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </>
                                : <Link to="/">  <CiUser className='size-7' /></Link>
                        }
                    </div>

                    <CiHeart className='size-7' />
                    <button className='hidden sm-block'><CiHeart className='size-7' /></button>
                    <Link to="/cart" className='bg-secondary 
                     p-1 sm-px-6 px-2 flex items-center rounded-sm'><FaShoppingCart />
                        <span className='text-sm font-semibold sm:ml-1'>0</span></Link>
                </div>
            </nav>
        </header>
    )
}
