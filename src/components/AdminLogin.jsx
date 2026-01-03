import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useForm } from "react-hook-form";
import axios from 'axios';
import getBaseUrl from '../utilis/baseUrl';




const AdminLogin = () => {
    const [message, setMessage] = useState("Please enter valid credentials");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        console.log(data);

        const response = await axios.post(`${getBaseUrl()}/api/users/admin/login`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });



        try {
            //await loginUser(data.email, data.password);
            // console.log(data)

            const auth = response.data;
            // console.log("Auth Data:", auth);
            //  console.log("Response from server:", response.data);

            if (auth.token) {
                localStorage.setItem("token", auth.token);//same name to get in adminroute
                setTimeout(() => {
                    localStorage.removeItem("token");
                    alert("Session expired. Please login again.");
                    navigate("/");
                }, 3600 * 1000);
            }

            alert("Login Successful");
            navigate("/dashboard");
        } catch (error) {
            setMessage("Failed to Login. Please check your credentials.");
        }
    };

    return (

        <div className='h-[calc(100vh-120px)] flex justify-center items-center my-3'>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 mb-4 pb-8 '>
                <h2 className='text-xl font-semibold mb-4'>Admin Dashboard Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="userName">
                            username
                        </label>
                        <input
                            defaultValue="user" {...register("userName")}

                            type="text" name="userName" id="userName" placeholder='Username' className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus: outline-none focus:shadow' />
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

                        <button className='bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none w-full'>
                            Login
                        </button>
                    </div>
                </form>
                <p className='align-baseline font-medium mt-4 text-sm'> Haven't an account <Link to="/register" className='text-blue-500 hover:text-blue-700'>Register</Link>  to Submit Reviews</p>

                {/**Goggle Signin */}

                <p className='text-center mt-5 text-gray-500 text-xs'>Book Store. All Copy Right Reserved</p>
            </div>
        </div>
    )
}

export default AdminLogin