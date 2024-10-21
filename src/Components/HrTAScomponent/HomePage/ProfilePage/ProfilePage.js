import React from 'react'
import Profile from "../../../../Assets/HrTas/Profile.svg"
import PhotoFrame from "../../../../Assets/HrTas/Photoframe.svg"

function ProfilePage() {
    return (
        <div className='flex columns-2'>
            <div className='w-full'>
                <div className='flex items-center justify-start  '>
                    <img className='w-5 h-5' src={Profile} alt="Notification" />
                    <h1 className='text-[20px] font-medium text-[#1255D0] ml-1'>Profile</h1>

                </div>

                <div className='text-[14px] mt-6'>
                    <h1 className='font-medium text-[#373737]'>Name</h1>
                    <p className='font-normal text-[#696A70]'>Ameena Zakir</p>
                </div>
                <div className='text-[14px] mt-6'>
                    <h1 className='font-medium text-[#373737]'>Designation</h1>
                    <p className='font-normal text-[#696A70]'>Frontend Developer</p>
                </div>
                <div className='text-[14px] mt-6'>
                    <h1 className='font-medium text-[#373737]'>Employee Code</h1>
                    <p className='font-normal text-[#696A70]'>TG4515232</p>
                </div>
                <div className='text-[14px] mt-6'>
                    <h1 className='font-medium text-[#373737]'>Department</h1>
                    <p className='font-normal text-[#696A70]'>Web Development</p>
                </div>
            </div>
            <div className='w-full flex items-start justify-end'>
            <img src={PhotoFrame} alt="" />
            </div>
        </div>
    )
}

export default ProfilePage
