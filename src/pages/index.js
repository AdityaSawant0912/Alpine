import { useSession, signOut } from 'next-auth/react'
import { LoginButton, RegisterButton, LogoutButton } from "@/components/buttons.component";
import InquiryForm from "@/components/forms/inquiryForm.component";
export default function Home() {
    const { data: session, status } = useSession()
    console.log(session);
    
    return (
        <>
            
            Home
            
            <div className='flex flex-row gap-5 mr-[3%] text-base font-semibold'>
                <div className='cursor-pointer' onClick={() => signOut()}>Logout</div>
            </div>

            <InquiryForm />
        </>
    )
}
