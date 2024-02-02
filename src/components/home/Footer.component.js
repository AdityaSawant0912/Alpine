import React from 'react'
import { Grid, Paper, Typography, Button } from '@mui/material';
import Link from 'next/link'
import Divider from '@mui/material/Divider';
import { Link as ScrollLink } from 'react-scroll';
const Footer = () => {
    return (
        <div className='my-44 mx-24' >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} className='mb-12' >
                    <Typography variant="h5" className='text-red-500'>QUICK LINKS</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} >
                            <Divider sx={{ borderBottomWidth: 1, background: 'black' }} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >

                            <Link href={'/#top'} className='text-2xl' >Home</Link>

                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                            <Link href={'/aboutus'} className='text-2xl'>About Us</Link>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                            <Link href={'/admin'} className='text-2xl'>Admin</Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6} className='mb-12'  >
                    <Typography variant="h5" className='text-red-500'>CONTACT US</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} >
                            <Divider sx={{ borderBottomWidth: 1, background: 'black' }} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                            <Link href={'/'} className='text-2xl' >Home</Link>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                            <Link href={'/aboutus'} className='text-2xl'>About Us</Link>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} >
                            <Link href={'/admin'} className='text-2xl'>Admin</Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <div className='mt-6 text-center'>
                &copy;The Kutchi Printers & Allied Industries Association
                <Divider variant='horizontal'/>
                Website Designed & Maintained By <Link href={'https://www.sakec.ac.in/'}>SAKEC</Link>
            </div>

        </div>
    )
}

export default Footer