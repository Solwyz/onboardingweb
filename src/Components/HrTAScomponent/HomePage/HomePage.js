import React from 'react'
import AlertPage from './AlertPage/AlertPage'
import ToDoListPage from './ToDoListPage/ToDoListPage'
import ProfilePage from './ProfilePage/ProfilePage'
import AnnouncementPage from './AnnouncementPage/AnnouncementPage'
import Users from '../../../Assets/HrTas/Userss.svg'
import Equalizer  from '../../../Assets/HrTas/equalizer.svg'
import EqualizerGreen  from '../../../Assets/HrTas/equalizerGreen.svg'
import EqualizerRed  from '../../../Assets/HrTas/equalizerRed.svg'

function HomePage() {
  return (
    <div className='bg-[#F2F3F4] p-6'>
    <div>
        <h1 className='text-[24px] font-medium '>Welcome Back !!</h1>
    </div>
    <div className='Attendance-section mt-5 flex gap-[17px]'>
        <div className='w-full h-[132px] bg-[#FFFFFF] px-6 py-4  rounded-lg '>
            <h1 className='text-[16px] text-[#1255D0] font-medium   '>Total employee</h1>
            <div className='flex items-center'>
             <img src={Users} alt="" />
             <h1 className='text-[32px] font-medium ml-4'>32</h1>
             <img className='ml-[132px]' src={Equalizer} alt="" />
            </div>
        </div>
        <div className='w-full h-[132px] bg-[#FFFFFF] px-6 py-4  rounded-lg '>
            <h1 className='text-[16px] text-[#21C331] font-medium   '>Today Present</h1>
            <div className='flex items-center'>
             <img src={Users} alt="" />
             <h1 className='text-[32px] font-medium ml-4'>29</h1>
             <img className='ml-[132px]' src={EqualizerGreen} alt="" />
            </div>
        </div>
        <div className='w-full h-[132px] bg-[#FFFFFF] px-6 py-4  rounded-lg '>
            <h1 className='text-[16px] text-[#E30707] font-medium   '>Total Leave</h1>
            <div className='flex items-center'>
             <img src={Users} alt="" />
             <h1 className='text-[32px] font-medium ml-4'>3</h1>
             <img className='ml-[132px]' src={EqualizerRed} alt="" />
            </div>
        </div>
        
    </div>
    <div className='DashBoard-section mt-5'>
    <div className='flex columns-2 gap-6'>
        <div className='w-full h-[330px] bg-[#FFFFFF] rounded-lg py-6 px-4 '><AlertPage/></div>
        <div className='w-full h-[330px] bg-[#FFFFFF] rounded-lg py-6 px-4  '><ToDoListPage/></div>
    </div>
    <div className='flex columns-2 gap-6 mt-4'>
        <div className='w-full h-[330px] bg-[#FFFFFF] rounded-lg py-6 px-4 '><ProfilePage/></div>
        <div className='w-full h-[330px] bg-[#FFFFFF] rounded-lg py-6 px-4  '><AnnouncementPage/></div>
    </div>
    </div>
    </div>
  )
}

export default HomePage