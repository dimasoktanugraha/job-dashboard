"use client"

import { Button } from '@/components/ui/button'
import React, { FC } from 'react'
import { RiHome3Line, RiMessage3Line, RiLogoutCircleLine } from "react-icons/ri";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { PiUsersThree } from "react-icons/pi";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { MdDateRange } from "react-icons/md";
import { BsGear } from "react-icons/bs";
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {

    const router = useRouter()

  return (
    <div className='pb-12 min-h-screen'>
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
            <h2 className='mb-4 px-4 text-lg font-semibold'>
                Dashboard
            </h2>
            <div className='space-y-2'>
                <Button 
                    variant={'ghost'} 
                    className='w-full justify-start rounded-none text-primary hover:text-primary'
                    onClick={() => router.push('/')}>
                    <RiHome3Line className='mr-3 text-lg'/>
                    Home  
                </Button>

                <Button 
                    variant={'ghost'} 
                    className='w-full justify-start rounded-none text-primary hover:text-primary'>
                    <RiMessage3Line className='mr-3 text-lg'/>
                    Messages  
                </Button>

                <Button 
                    variant={'ghost'} 
                    className='w-full justify-start rounded-none text-primary hover:text-primary'>
                    <TbBuildingSkyscraper className='mr-3 text-lg'/>
                    Company Profile  
                </Button>

                <Button 
                    variant={'ghost'} 
                    className='w-full justify-start rounded-none text-primary hover:text-primary'>
                    <PiUsersThree className='mr-3 text-lg'/>
                    All Applicants 
                </Button>

                <Button 
                    variant={'ghost'} 
                    className='w-full justify-start rounded-none text-primary hover:text-primary'
                    onClick={() => router.push('/job-listings')}>
                    <HiOutlineDocumentText className='mr-3 text-lg'/>
                    Job Listings
                </Button>

                <Button 
                    variant={'ghost'} 
                    className='w-full justify-start rounded-none text-primary hover:text-primary'>
                    <MdDateRange className='mr-3 text-lg'/>
                    My Schedules
                </Button>
            </div>
            
        </div>
      </div>

      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
            <h2 className='mb-4 px-4 text-lg font-semibold'>
                Settings
            </h2>
            <div className='space-y-2'>
                <Button 
                    variant={'ghost'} 
                    className='w-full justify-start rounded-none text-primary hover:text-primary'
                    onClick={() => router.push('/settings')}>
                    <BsGear className='mr-3 text-lg'/>
                    Settings  
                </Button>

                <Button 
                    variant={'ghost'} 
                    className='w-full text-red-500 hover:text-red-700 hover:bg-red-100 justify-start rounded-none'
                    onClick={() => signOut()}>
                    <RiLogoutCircleLine className='mr-3 text-lg'/>
                    Logout  
                </Button>
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default Sidebar

