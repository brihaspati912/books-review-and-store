import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { FaBarsStaggered } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import user from "../assets/user.jpg";
import { useSelector } from 'react-redux';
import { useAuth } from '../Context/AuthContext';

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
        name: "Reviews", href: "/reviews"
    },

]


export default function Navbar() {

    const { currentUser, logOutUser } = useAuth();
    //const currentUser = false;
    const handleLogOut = () => {
        logOutUser()
    }


    const [isdropDownOpen, setisdropDownOpen] = useState(false);
    //console.log(isdropDownOpen)
    const cartItems = useSelector(state => state.cart.cartItems);
    // console.log(cartItems)



    return (
        <header className="max-w-screen-2xl mx-auto px-4 py-6">
            <nav className='flex justify-between px-6 items-center'>
                {/*left side */}
                <div className='flex items-center md:gap-16 gap-4'>
                    <Link to="/"><FaBarsStaggered className='size-7' /></Link>

                   <div className="relative w-full sm:max-w-xs">
  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
  <input
    type="text"
    placeholder="Search"
    className="w-full pl-10 pr-4 py-2 rounded-md border bg-[#EAEAEA] focus:outline-none focus:ring-2 focus:ring-yellow-500"
  />
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
                                                <li><button onClick={handleLogOut} className='block px-4 py-2 w-full text-left text-sm hover:bg-grey-100'> LogOut</button></li>
                                            </ul>
                                        </div>
                                    )}
                                </>
                                : <Link to="/login">  <CiUser className='size-7' /></Link>
                        }
                    </div>

                    <CiHeart className='size-7' />
                    <button className='hidden sm-block'><CiHeart className='size-7' /></button>
                    <Link to="/cart" className='bg-secondary 
                     p-1 sm-px-6 px-2 flex items-center rounded-sm'>
                        <FaShoppingCart />
                        {
                            cartItems.length > 0 ? <span className='text-sm font-semibold sm:ml-1'>
                                {
                                    cartItems.length}</span> : <span className='text-sm font-semibold sm:ml-1'>0</span>
                        }
                    </Link>
                </div>
            </nav>
        </header>
    )
}
