import { useSession, signOut } from 'next-auth/react'
import { LoginButton, RegisterButton, LogoutButton } from "@/components/buttons.component";
import InquiryForm from "@/components/forms/inquiryForm.component";
import Headers from "@/components/home/Headers.component";
import Navbar from "@/components/home/Navbar.component";
import Advert from "@/components/home/Advert.component";
import Categories from "@/components/home/Categories.component";
import Footer from "@/components/home/Footer.component";


// 3EB9EB
// 7ACFDB

export default function Home({ categories }) {
    const { data: session, status } = useSession()
    console.log(session);

    return (
        <>
           <Headers/>
           <Advert/>
            <main className='mx-4 md:mx-12 lg:mx-36'>
            
                <Navbar active={ 'home' } />
                <Categories categories={categories} />
           <Footer/>
            </main>
        </>
    )
}


export async function getServerSideProps(context) {
    
    let data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories`)
    let results = await data.json()
    return {
        props: { categories: results }, // will be passed to the page component as props
    }
    
}