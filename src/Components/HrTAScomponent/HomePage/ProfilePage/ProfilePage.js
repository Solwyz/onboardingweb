import React, { useEffect, useState } from 'react'
import Profile from "../../../../Assets/HrTas/Profile.svg"
import PhotoFrame from "../../../../Assets/HrTas/Photoframe.svg"

function ProfilePage() {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        console.log('userDetails', JSON.parse(localStorage.getItem('userDetails')))
        console.log('userName', JSON.parse(localStorage.getItem('userDetails')).userName)
        setUserName(JSON.parse(localStorage.getItem('userDetails')).userName || 'Solwyz user')
    }, [])


    return (
        <div className='flex columns-2'>
            <div className='w-full'>
                <div className='flex items-center justify-start  '>
                    <img className='w-5 h-5' src={Profile} alt="Notification" />
                    <h1 className='text-[20px] font-medium text-[#1255D0] ml-1'>Profile</h1>

                </div>

                <div className='text-[14px] mt-6'>
                    <h1 className='font-medium text-[#373737]'>Name</h1>
                    <p className='font-normal text-[#696A70]'>{userName}</p>
                </div>
                <div className='text-[14px] mt-6'>
                    <h1 className='font-medium text-[#373737]'>Designation</h1>
                    <p className='font-normal text-[#696A70]'>HR Manager</p>
                </div>
                <div className='text-[14px] mt-6'>
                    <h1 className='font-medium text-[#373737]'>Employee Code</h1>
                    <p className='font-normal text-[#696A70]'>TG4515232</p>
                </div>
                <div className='text-[14px] mt-6'>
                    <h1 className='font-medium text-[#373737]'>Department</h1>
                    <p className='font-normal text-[#696A70]'>HR Department</p>
                </div>
            </div>
            <div className='w-full flex items-start justify-end'>
            <img src={PhotoFrame} alt="" />
            </div>
        </div>
    )
}

export default ProfilePage
