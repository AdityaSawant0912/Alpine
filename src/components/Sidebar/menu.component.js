import React from 'react'
import { Menu } from 'antd'
import { HomeOutlined } from '@mui/icons-material'
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Link from 'next/link'

export const NavigationLink = ({ href, children }) => {
    return (
        // <Link
        //     className='text-red-500 p-2 px-4 w-30 rounded-3xl m-2 text-center'
        //     href={href}
        // >
        //     {name}
        // </Link>
        <Link className="nav-link" aria-current="page" href={href}>
            {children}
        </Link>
    )
  }

const MenuList = () => {
  return (
    <>
        <Menu theme='dark' mode='inline' className='flex flex-col  h-[88vh] mt-6  text-[0.9rem] '>
            <Menu.Item key="Home" className='p-1' icon={<HomeOutlined/>} ><NavigationLink href={'/admin/'} >Home</NavigationLink></Menu.Item>
              <Menu.Item key="Profile" icon={<AccountCircleOutlinedIcon />}><NavigationLink href={'/admin/profile'} >Profile</NavigationLink></Menu.Item>
            <Menu.Item key="Users" icon={<PeopleOutlineOutlinedIcon/>} ><NavigationLink href={'/admin/users'} >Users</NavigationLink></Menu.Item>
              <Menu.Item key="Inquires" icon={<TextSnippetOutlinedIcon />}><NavigationLink href={'/admin/inquiries'} >Inquiries</NavigationLink></Menu.Item>
              <Menu.Item key="Categories" icon={<CategoryOutlinedIcon />}><NavigationLink href={'/admin/categories'} >Categories</NavigationLink></Menu.Item>
              <Menu.Item key="Advertisments" icon={<AutoAwesomeMotionOutlinedIcon />}><NavigationLink href={'/admin/adverts'} >Advertisments</NavigationLink></Menu.Item>
              <Menu.Item key="Notification" icon={<NotificationsActiveOutlinedIcon />}><NavigationLink href={'/admin/notifications'} >Notification</NavigationLink></Menu.Item>
              <Menu.Item key="Settings" icon={<AdminPanelSettingsOutlinedIcon />}><NavigationLink href={'/admin/settings'} >Settings</NavigationLink></Menu.Item>
        </Menu>
    </>
    )
}

export default MenuList;
