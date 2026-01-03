import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from '../Context/AuthContext';







export const Login = () => {

    const [message, setMessage] = useState("Please enter valid credentials");

    const { loginUser, signInWithGoogle } = useAuth();
    const Navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();


    const onSubmit = async (data) => {
        console.log(data);

        try {
            await loginUser(data.email, data.password);
            alert("Login Successful");
            Navigate("/");

        } catch (error) {
            setMessage("Failed to Login. Please check your credentials.");
        }
    };


    const handleGoggleSignIn = async () => {
        //console.log("Goggle Sign In Clicked");
        try {
            await signInWithGoogle();
            alert("Login Successful");
            Navigate("/");
        } catch (error) {
            alert("Failed to Login.");
        }
    }


    return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 mb-4 pb-8 '>
                <h2 className='text-xl font-semibold mb-4'>Please Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">
                            Email
                        </label>
                        <input
                            defaultValue="email" {...register("email")}

                            type="email" name="email" id="email" placeholder='Email Address' className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus: outline-none focus:shadow' />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">
                            Password
                        </label>
                        <input
                            defaultValue="password" {...register("password")}
                            type="password" name="password" id="password" placeholder='Password' className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus: outline-none focus:shadow' />
                    </div>
                    <div className=''>
                        {
                            message && <p className='text-sm text-red-500 italic mb-5'>{message}</p>
                        }

                        <button className='bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none '>
                            Login
                        </button>
                    </div>
                </form>
                <p className='align-baseline font-medium mt-4 text-sm'> Haven't an account <Link to="/register" className='text-blue-500 hover:text-blue-700'>Register</Link>  to Submit Reviews</p>

                {/**Goggle Signin */}
                <div className='mt-4'>
                    <button
                        onClick={handleGoggleSignIn}
                        className='w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none' >
                        <FaGoogle className='mr-2' />
                        Signing with Goggle
                    </button>

                </div>
                <p className='text-center mt-5 text-gray-500 text-xs'>Book Store. All Copy Right Reserved</p>
            </div>
        </div>
    )
}
