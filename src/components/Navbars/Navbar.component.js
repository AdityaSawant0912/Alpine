import Link from 'next/link'
import Image from 'next/image'
// import logo from '@/../public/images/idf-logo.png'
import { useSession, signOut } from 'next-auth/react'
import printStyles from '@/styles/Print.module.css'
import {Layout} from "antd"

export const NavLink = ({ href, children }) => {
    return (
        // <Link
        //     className='text-red-500 p-2 px-4 w-30 rounded-3xl m-2 text-center'
        //     href={href}
        // >
        //     {name}
        // </Link>
        <Link className="nav-link bg-blue-400 hover:bg-blue-600 p-2 px-4 w-30 rounded-3xl m-2 text-center" aria-current="page" href={href}>
            {children}
        </Link>
    )
}

const Navbar = ({ children }) => {
    let { data: session } = useSession()
    return (
        <div className={`flex flex-col ${printStyles.no_print}`}>
            <div className='flex flex-row justify-center'>
                <Link
                    className='flex flex-col m-2'
                    href='https://www.idf.org.in'
                    passHref
                >
                    {/* <Image className='w-16 h-20 ' src={logo} alt='idf-logo.png' /> */}
                </Link>
                <div className='flex flex-col '>
                    <h1 className='flex flex-row m-0 font-bold'>
                        Indian Development Foundation
                    </h1>
                    <p className='flex flex-row m-0 text-sm'>
                        A National NGO committed to Health, Education, and Development
                    </p>
                    <p className='flex flex-row text-sm'>
                        IDF - Organization in Special Consultative Status with the Economic
                        and Social Council since 2012.
                    </p>
                </div>
            </div>
            <div className='flex flex-row justify-center text-white font-bold items-center font'>
                <NavLink href={'/'} >Home</NavLink>
                {!session?.user ? <></> : !session?.user?.isAdmin ? <></> : <NavLink href={'/admin'}>Admin</NavLink>}
                {children ? children : <></>}
                {session?.user ? <></> : <NavLink href={'/auth/register'} >Register</NavLink>}
                {session?.user ? <></> : <NavLink href={'/auth/login'} >Login In</NavLink>}
                {!session?.user ? <></> : <button className="nav-link bg-blue-400 hover:bg-blue-600 p-2 px-4 w-30 rounded-3xl m-2 text-center" onClick={() => signOut()}>Sign out</button>}
                
                
            </div>
        </div>
    )
}
export default Navbar
