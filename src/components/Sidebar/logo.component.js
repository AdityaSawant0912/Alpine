import React from "react";
import {FireFilled} from "@ant-design/icons"
// import logo from '@/../public/images/idf-logo.png'
import Image from 'next/image'
// import SuiDhaga from '@/../public/images/suidhaga.png'
// import SuiDhagaLogo from "../../../public/images/public/images/094b60_64c843bc974b4c7bb494807a79c3dcfd~mv2.webp"

const Logo = () =>{
    return(
        <>
            <div className="flex items-center justify-center  mt-2">
                <div className=" h-[40px] flex items-center justify-center font-semibold text-[1.5rem] rounded-[10%] bg-[rgba(28,17,41,0.88)]">
                    {/* <FireFilled/>    */}
                    {/* <Image alt="" src={SuiDhaga} width={40} height={40}  /> */}
                    {/* Sui Dhaaga */}
                </div>
            </div>
        </>
    )
};

export default Logo;