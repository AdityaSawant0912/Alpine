import React, { useState } from 'react'
import Link from 'next/link'
import FacebookIcon from '@mui/icons-material/Facebook';
import { FaUserCircle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';


const NavabarHero = () => {
    const [hidden, setHidden] = useState(true);
    return (
        <div className='pb-16 relative z-1 border-ribbonBorder'>
            <div className='text-left'>

                <div>
                    <div className='pb-12 lg:pb-12 xl:pb-0 '>
                        <nav>
                            <div className="hidden lg:block bg-[#FEFEFF]">
                                <div className='container mx-auto px-24'>
                                    <div className='flex justify-between items-center py-2.5'>
                                        <div className='flex space-x-6'>
                                            <Link href={"https://www.facebook.com/kutchiprintersassociation/"}>
                                                <FaFacebookF className='text-[#D8DBDF] hover:text-black' />
                                            </Link>
                                            <Link href={"https://www.facebook.com/kutchiprintersassociation/"}>
                                                <FaFacebookF className='text-[#D8DBDF] hover:text-black' />
                                            </Link>
                                        </div>
                                        <div className=' flex items-center'>
                                            <div className='hidden sm:inline'>
                                                <Link className='text-lg  text-[#831f58]' href={"tel:+919820221677"}>+91 9820221677</Link>
                                            </div>
                                            <span className='hidden w-px h-6 bg-[#831f58] sm:inline mx-3'></span>
                                            <Link className='text-lg font-Inter text-utilityNav hidden sm:inline' href={"/login"}>
                                                <div className='flex items-center'>
                                                    <span className='text-[#831f58]'>Log In</span>
                                                    <AccountCircleOutlinedIcon className='text-[#831f58] w-6 h-6 ml-2' />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </nav>

                        <header>
                            <div className='lg:bg-transparent bg-[#FEFEFF]'>
                                <nav className='lg:container lg:mx-auto lg:px-24'>
                                    <div className='flex flex-wrap justify-between py-2.5 lg:py-6'>
                                        <div className='lg:pl-0 pl-5'>
                                            <Link href={"/"}>
                                                <picture>
                                                    <source srcSet='/logo.svg' media='(min-width: 1024px)' />
                                                    <img src="/logo.svg" alt="KPAIA" width={77} height={40} />
                                                </picture>
                                            </Link>
                                        </div>
                                        <div className='flex items-center lg:order-2 pr-3 lg:pr-0'>

                                            <span>
                                                <Link className='hidden lg:inline-block bg-[#72bfe2] hover:bg-[#89c1db] text-headerCta hover:text-headerCtaHover font-Inter inline-block rounded px-4 py-2.5 shadow-sm cursor-pointer' href={'#inquire'}>
                                                    <span aria-hidden="true" className='text-white'>Inquire</span>
                                                </Link>
                                            </span>

                                            <button className='inline-flex items-center p-2 ml-1 text-sm text-[#D5198E] lg:hidden focus:outline-none' onClick={() => setHidden(!hidden)}>
                                                <MenuOutlinedIcon />
                                            </button>

                                        </div>
                                        <div className={`overflow-y-scroll lg:overflow-y-visible mt-2.5 lg:mt-0 bg-[#F6F9F8] lg:bg-transparent justify-between items-center h-screen lg:h-auto w-full lg:flex lg:w-auto lg:order-1 text-left ${hidden ? 'hidden' : ''}`}>

                                            <ul className='flex flex-col font-Inter lg:flex-row'>
                                                <li>
                                                    <Link href={"/#"} className='px-6 font-Inter block py-3 lg:pr-4 lg:pl-3 text-[#D5198E] lg:text-blue-500 hover:bg-pnavDropdownBackgroundHover lg:hover:bg-transparent lg:hover:text-blue-500 lg:p-0'>
                                                        Some Where
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={"/about"} className='px-6 font-Inter block py-3 lg:pr-4 lg:pl-3 text-[#D5198E] lg:text-blue-500 hover:bg-pnavDropdownBackgroundHover lg:hover:bg-transparent lg:hover:text-blue-500 lg:p-0'>

                                                        About
                                                    </Link>
                                                </li>
                                            </ul>

                                            <div className='lg:hidden'>
                                                <div className='px-6'>
                                                    <span>
                                                        <Link href={'/login'} className='mt-3 w-full text-center block bg-[#c73990] hover:bg-[#ac317d] text-headerCta hover:text-headerCtaHover font-Inter inline-block rounded px-4 py-2.5 shadow-sm cursor-pointer'>
                                                            <span aria-hidden="true" className='text-white'>Inquire</span>
                                                        </Link>
                                                    </span>
                                                    <span>
                                                        <Link href={'/login'} className='mt-6 w-full text-center block ring-2 ring-[#c73990] text-[#c73990] hover:text-[#ac317d] hover:ring-[#ac317d] font-Inter inline-block rounded px-4 py-2.5 shadow-sm cursor-pointer'>
                                                            <span aria-hidden="true" >Login</span>
                                                        </Link>
                                                    </span>
                                                </div>
                                                <div className='mt-6 px-6'>
                                                    <div className='flex justify-center md:justify-normal items-center md:order-last my-6'>
                                                        <Link className='text-lg  text-blue-500' href={"tel:+919820221677"}>+91 9820221677</Link>
                                                    </div>
                                                    <div className='mt-6 flex justify-center space-x-6'>
                                                        <Link href={"https://www.facebook.com/kutchiprintersassociation/"}>
                                                            <FaFacebookF className='text-[#D5198E] hover:text-black' fontSize={24} />
                                                        </Link>
                                                        <Link href={"https://www.facebook.com/kutchiprintersassociation/"}>
                                                            <FaFacebookF className='text-[#D5198E] hover:text-black' fontSize={24} />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </nav>

                            </div>
                        </header>

                    </div>
                    <div className='container px-6 mx-auto'>
                        <div className='grid lg:gap-8 xl:gap-0 lg:grid-cols-12'>
                            <div className='mr-auto place-self-center lg:col-span-6'>
                                <div>
                                    <div className='mb-6'>
                                        <span className='text-[#ecadd0] font-Inter text-xxxs md:text-xxs'>GIVE YOUR PRINTING EXPERIENCE A BOOST</span>
                                    </div>
                                    <div className='mb-6'>
                                        <h1 className='mr-auto max-w-[40rem] text-white font-heading font-Inter text-3xl sm:text-4xl lg:text-6xl block antialiased whitespace-pre-wrap'>
                                            Printing that&apos;s powered by us, {""}
                                            <strong className='text-[#2FC3F1]'>inspired by you</strong>.
                                        </h1>

                                    </div>
                                    <div className='mr-auto mb-6 prose prose-headings:text-white prose-headings:font-Inter prose-p:text-content prose-p:text-white md:prose-p:text-white prose-p:font-Inter prose-a:text-link prose-a:hover:text-linkHover prose-a:no-underline prose-a:cursor-pointer marker:text-white prose-ul:list-outside text-white text-xl'>
                                        Feeling ready for a fresh-new printing experience? We&apos;ve got the expertise to fuel your printing needs, and the kick-ass printing solutions to prove it.
                                    </div>
                                    <div className='justify-start flex gap-x-4'>

                                        <span>
                                            <Link href={"/#categories"} className='bg-white text-cta hover:bg-[#f4f4f4] hover:text-ctaHover font-Inter inline-block rounded px-4 py-2.5 shadow-sm cursor-pointer'>Find my perfect printing category</Link>
                                        </span>
                                    </div>
                                </div>

                            </div>
                            <div className='-mb-16 lg:mt-0 lg:col-span-6 xl:col-span-6 lg:flex lg:items-end'>
                                {/* Image width 752 height 500 */}
                                {/* <img alt="Web hosting that's powered by us, inspired by you." src="https://cms.mochahost.com/uploads/Home_Hero_0b7cf02e51.webp" srcset="https://cms.mochahost.com/uploads/small_Home_Hero_0b7cf02e51.webp 608w,https://cms.mochahost.com/uploads/medium_Home_Hero_0b7cf02e51.webp 736w,https://cms.mochahost.com/uploads/large_Home_Hero_0b7cf02e51.webp 752w" sizes="(max-width: 768px) 608px, (max-width: 1024px) 736px, 752px" width="752" height="500" class="h-full w-full object-cover lg:max-h-[28rem] xl:max-h-none select-none"> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavabarHero