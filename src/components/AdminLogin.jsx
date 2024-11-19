import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import axios from "axios"
import getBaseUrl from '../utils/baseURL'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const AdminLogin = () => {

    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async(data) => {
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            const auth = response.data;
            if(auth.token){
                localStorage.setItem('token', auth.token);
                setTimeout(() => {
                    localStorage.removeItem('token');
                    alert('Token has been expired!, please login again.')
                    navigate("/")
                }, 3600 * 1000);
            }
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Login Successful",
                showConfirmButton: false,
                timer: 2000
            });
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (error) {
            setMessage(<p className='text-sm font-semibold red-600 pb-2'>Please provide a valid username and password</p>);
            console.log(error)
        }
    }

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl font-semibold mb-4'>Admin Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Username</label>
                        <input
                        {...register("username", { required: true })}
                        type="text" name='username' id='username' placeholder='Username' autoComplete='off'
                        className='shadow-appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none
                        focus:shadow'/>

                        <label className='block text-gray-700 text-sm font-bold mb-2 mt-4' htmlFor="password">Password</label>
                        <input 
                        {...register("password", { required: true })}
                        type="password" name='password' id='password' placeholder='Password' autoComplete='off'
                        className='shadow-appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none
                        focus:shadow'/>
                    </div>
                    {
                        message && <p className='text-red-500 italic tect-xs mb-3'>{message}</p>
                    }
                    <div>
                        <button className='bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>Login</button>
                    </div>
                </form>
                {/* <p className='mt-5 text-center text-xs text-gray-500'>&copy;2024 Book Store. All rights reserved</p> */}
            </div>
        </div>
    )
}

export default AdminLogin