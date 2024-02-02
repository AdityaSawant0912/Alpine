import React from 'react'
import Link from 'next/link'
import { FaFacebookF } from "react-icons/fa";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import Image from 'next/image';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Headers = () => {
    return (

        <div className='grid grid-flow-col md:auto-rows-max auto-cols-max gap-4  mt-6 items-center justify-center'>
            <div className='mx-auto pl-5'>
                <Link href={'/'}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className='lg:max-w-[180px] md:max-w-[140px] mx-w-[110px]' src="/logo.svg" alt="idk" width={150} height={180} />
                </Link>
            </div>
            <div className='text-4xl max-w-5xl text-center mx-auto'>
                <h3>THE KUTCHI PRINTERS & ALLIED INDUSTRIES ASSOCIATION</h3>
            </div>
            <div className='mx-auto flex flex-row text-xl max-w-5xl'>
                <span className='mx-auto'>
                    <h4 >Email: <Link href={'mailto:kutchiprinter@gmail.com'}>kutchiprinter@gmail.com</Link></h4>
                </span>

                <span className='hidden w-[2px] h-10 bg-[#000000] sm:inline mx-3'></span>

                <span className='items-center justify-center'>
                    <Link href={"https://www.facebook.com/kutchiprintersassociation/"}>
                        <FaFacebookF className='text-[#0E8EF3] hover:text-black items-center' fontSize={28} />
                    </Link>
                </span>
            </div>
        </div>

    )
}

export default Headers