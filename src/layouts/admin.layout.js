import { useSession, getSession } from 'next-auth/react'
import {
    LoginButton,
    RegisterButton,
    LogoutButton
} from '@/components/buttons.component'
import AdminNav from '@/components/Navbars/AdminNav.component'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
// import logo from '@/../public/images/idf-logo.png'


export default function AdminLayout({ children }) {

    return (
        <>
            <AdminNav>
               
                {children}

            </AdminNav>


        </>
    )
}

export async function getServerSideProps(context) {
    user = await getSession(context)
    console.log(user);
    if (!user) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false
            }
        }
    }
}
