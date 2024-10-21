import React from 'react';
import Notification from "../../../../Assets/HrTas/notifications_active.svg";
import "../AlertPage/Alert.css"

const alerts = [
    {
        day: 'Mon',
        date: '10',
        title: 'Leave request',
        description: 'Ameena Zakir applied for leave'
    },
    {
        day: 'Tue',
        date: '11',
        title: 'End of Probation',
        description: 'Tomin Thomas probation completes on 21/12/2024'
    },
    {
        day: 'Wed',
        date: '12',
        title: 'Anniversary',
        description: 'Anupriya Biju’s wedding anniversary is on 19/11/2023'
    },
    {
        day: 'Thu',
        date: '13',
        title: 'Birthday !!!',
        description: 'Varun Raj’s birthday is on 23/12/2023'
    },
    
];

function AlertPage() {
    return (
        <div>
      
            <div className='flex items-center justify-start'>
                <img className='w-5 h-5' src={Notification} alt="Notification" />
                <h1 className='text-[20px] font-medium text-[#1255D0] ml-1'>Alerts</h1>
            </div>

        
            <div className='Alert-List mt-[28px] max-h-[236px] overflow-y-auto custom-scrollbar mr-6  '>
                {alerts.map((alert, index) => (
                    <div key={index} className={`flex items-center ${index > 0 ? 'mt-6' : ''}`}>
                        <div className='w-10 h-10 bg-[#EAE4FF] rounded-md text-[12px] leading-4 text-[#685899] text-center p-1'>
                            <h1 className='font-semibold'>{alert.day}</h1>
                            <h1 className='font-normal'>{alert.date}</h1>
                        </div>
                        <div className='text-[14px] leading-[18px] ml-2'>
                            <h1 className='font-medium text-[#373737]'>{alert.title}</h1>
                            <h1 className='font-normal text-[#696A70]'>{alert.description}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AlertPage;