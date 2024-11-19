import React, { useState} from 'react'
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { Link } from 'react-router-dom';
import avatarIcon from '../assets/avatar.png'
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {

    // const currentUser = false;
    const {currentUser, logoutUser} = useAuth();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigation = [
        {name: 'Dashboard', href: '/dashboard'},
        {name: 'Orders', href: '/orders'},
        {name: 'Cart Page', href: '/cart'},
        {name: 'Check Out', href: '/checkout'},
    ]
    const cartItems = useSelector(state => state.cart.cartItems);

    const handleLogout = () => {
        logoutUser();
        setIsDropdownOpen(false);
    }

    return (
        <header className='max-w-screen-2xl mx-auto px-4 py-6 sticky top-0 bg-slate-200 z-50'>
            <nav className='flex justify-between items-center'>
                <div className='flex items-center gap-4 md:gap-16'>
                    <Link to={'/'}>
                        <HiMiniBars3CenterLeft className='size-6' onClick={() => setIsDropdownOpen(false)} />
                    </Link>
                    <div className='relative sm:w-72 w-40 space-x-2'>
                        <IoSearchOutline className='absolute inline-block left-3 inset-y-2'/>
                        <input type='text' disabled placeholder='Search here' className='bg-white w-full py-1 md:px-8 px-8 rounded-md
                        focus: outline-none' />
                    </div>
                </div>
                <div className='relative flex items-center md:space-x-3 space-x-2'>
                    <div>
                        {
                            currentUser ? <>
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                <img src={avatarIcon} alt="" className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`} />
                            </button>
                            {
                                isDropdownOpen && (
                                    <div className='absolute right-0 mt-2 w-48 bg-white
                                    shadow-lg rounded-md z-40'>
                                        <ul className='py-2'>
                                            {
                                                navigation.map((item) => (
                                                    <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                        <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-gray-100'>
                                                            {item.name}
                                                        </Link> 
                                                    </li>
                                                ))
                                            }
                                            <li>
                                                <button
                                                onClick={() => handleLogout()}
                                                className='block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left'>Logout</button>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }
                            </> : <Link to={'/login'}><HiOutlineUser className='size-6' /></Link>
                        }
                    </div>
                    <button className='hidden sm:block'>
                        <HiOutlineHeart className='size-6' />
                    </button>
                    <Link to={'/cart'} className='bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm'>
                        <HiOutlineShoppingCart className='size-6' />
                        {
                            cartItems.length > 0 ? <span className='text-sm font-semibold sm:ml-1'>{cartItems.length}</span> :
                            <span className='text-sm font-semibold sm:ml-1'>0</span>
                        }
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;