import React from 'react'
import Link from 'next/link'
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
const Navbar = ({ active }) => {
    return (
        <div>

            <ul className='flex  flex-row  justify-center items-center'>
                <li className='mr-12'>
                    <Link href={"/"} className='text-2xl  '>
                        <div className={`md:w-[230px] md:h-[230px] w-[150px] h-[150px] ${active == 'home' ? 'bg-red-600 text-white' : 'bg-white text-red-600'}  rounded-full flex flex-col items-center justify-center border-gray-300 border-8 spinny`}>
                        <span className='mb-4 '>
                                <HomeIcon fontSize={'large'} className={`${active == 'home' ? 'text-white' : 'text-red-600 ' }`} />
                        </span>
                        <span >
                            Home
                        </span>
                        </div>
                    </Link>
                </li>
                <li >
                    <Link href={"/about us"} className={`text-2xl  `}>
                        <div className={`md:w-[230px] md:h-[230px] w-[150px] h-[150px] ${active == 'about' ? 'bg-red-600 text-white' : 'bg-white text-red-600' } rounded-full flex flex-col items-center justify-center border-gray-300 border-8 spinny`}>
                        <span className='mb-4'>
                                <InfoIcon fontSize={'large'} className={`${active == 'about' ? 'text-white' : 'text-red-600 '}`} />
                        </span>
                            About Us
                        </div>
                    </Link>
                </li>


            </ul>

        </div>
    )
}

export default Navbar