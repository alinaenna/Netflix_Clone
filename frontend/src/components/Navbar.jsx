import React from 'react'
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='bg-black text-gray-200 flex justify-between items-center p-4 h-20 md:text-[15px] font-medium text-nowrap'>

            <Link to={"/"}>
                <img src="/logo.png" alt="Logo" className='w-32 cursor-pointer brightness-125' />
            </Link>

            <ul className='hidden xl:flex space-x-6'>
                <li className='cursor-pointer hover:text-[#e50914]'>Home</li>
                <li className='cursor-pointer hover:text-[#e50914]'>TV Shows</li>
                <li className='cursor-pointer hover:text-[#e50914]'>Movies</li>
                <li className='cursor-pointer hover:text-[#e50914]'>Anime</li>
                <li className='cursor-pointer hover:text-[#e50914]'>Games</li>
                <li className='cursor-pointer hover:text-[#e50914]'>New & Popular</li>
                <li className='cursor-pointer hover:text-[#e50914]'>Upcoming</li>
            </ul>

            <div className='flex items-center space-x-4 relative'>
                <div className='relative hidden md:inline-flex'>
                    <input type="text" className='bg-[#333333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none' placeholder='Search' />
                    <Search className='absolute top-2 right-4 w-5 h-5' />
                </div>
                <button className='bg-[#e50914] px-5 py-2 rounded-full cursor-pointer text-white'>
                    Get AI Movie Selections
                </button>

                <Link to={"/signin"}>
                    <button className='border border-[#333333] py-2 px-4 cursor-pointer'>
                        Sign In
                    </button>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;