import { useSession } from 'next-auth/react'
import AdminLayout from '@/layouts/admin.layout'
import {
    LoginButton,
    RegisterButton,
    LogoutButton
} from '@/components/buttons.component'
import AdminNav from '@/components/Navbars/AdminNav.component'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { adminGSSP } from '@/lib/utils'


export default function Home() {
    const { data: session, status } = useSession()
    console.log(status, session)

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/admin/users/', { credentials: "same-origin" });
                const data = await response.json();
                console.log(response);
                if (response.ok) {
                    setUsers(data.users);
                    console.log(data.users);
                } else {
                    console.error('Error fetching users:', data.message);
                }
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };

        fetchUsers();
    }, []);


    return (

        <AdminLayout>
            <h1>Admin Home</h1>
        </AdminLayout>



    )
}


export async function getServerSideProps(context) {
    return await adminGSSP(context);
}