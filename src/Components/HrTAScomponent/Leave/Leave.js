import React, { useState } from 'react'
import approveActive from '../../../Assets/HrTas/leaveRequest/check_circle (1).svg'
import approveDeactive from '../../../Assets/HrTas/leaveRequest/check_circle (2).svg'
import rejectActive from '../../../Assets/HrTas/leaveRequest/cancel.svg'
import rejectDeactive from '../../../Assets/HrTas/leaveRequest/cancel (1).svg'

function Leave() {

  const [leaveRequests, setLeaveRequests] = useState([
    {
      "employeeId": "AT96562",
      "name": "Aswin Syam",
      "leaveType": "Casual",
      "appliedOn": "24/07/2024",
      "department": "Development",
      "from": "24/07/2024",
      "to": "24/07/2024",
      "days": 1,
      "status": "Pending"
    },
    {
      "employeeId": "AT96562",
      "name": "Emmanuel",
      "leaveType": "Sick",
      "appliedOn": "24/07/2024",
      "department": "Graphics",
      "from": "24/07/2024",
      "to": "24/07/2024",
      "days": 2,
      "status": "Approved"
    },
    {
      "employeeId": "AT96562",
      "name": "Nizam",
      "leaveType": "Casual",
      "appliedOn": "24/07/2024",
      "department": "Finance",
      "from": "24/07/2024",
      "to": "24/07/2024",
      "days": 1,
      "status": "Rejected"
    },
    {
      "employeeId": "AT96562",
      "name": "Raaj B",
      "leaveType": "Casual",
      "appliedOn": "24/07/2024",
      "department": "Store",
      "from": "24/07/2024",
      "to": "24/07/2024",
      "days": 2,
      "status": "Approved"
    },
    {
      "employeeId": "AT96563",
      "name": "dAswin Syam",
      "leaveType": "Casual",
      "appliedOn": "24/07/2024",
      "department": "Development",
      "from": "24/07/2024",
      "to": "24/07/2024",
      "days": 1,
      "status": "Pending"
    },
    {
      "employeeId": "AT96564",
      "name": "dEmmanuel",
      "leaveType": "Sick",
      "appliedOn": "24/07/2024",
      "department": "Graphics",
      "from": "24/07/2024",
      "to": "24/07/2024",
      "days": 2,
      "status": "Approved"
    },
    {
      "employeeId": "AT96565",
      "name": "dNizam",
      "leaveType": "Casual",
      "appliedOn": "24/07/2024",
      "department": "Finance",
      "from": "24/07/2024",
      "to": "24/07/2024",
      "days": 1,
      "status": "Rejected"
    },
    {
      "employeeId": "AT96566",
      "name": "dRaaj B",
      "leaveType": "Casual",
      "appliedOn": "24/07/2024",
      "department": "Store",
      "from": "24/07/2024",
      "to": "24/07/2024",
      "days": 2,
      "status": "Approved"
    }
  ])

  const handleStatusChange = (index, newStatus) => {
    const updatedLeaveRequests = [...leaveRequests];
    updatedLeaveRequests[index].status = newStatus;
    setLeaveRequests(updatedLeaveRequests)

    // sendStatusToBackend(updatedLeaveRequests[index]);
  }

  const renderActionButtons = (status, index) => {
    if (status === 'Approved') {
      return (
        <div className='flex items-center gap-6'>
          <div className='flex items-center'><img src={approveActive} className='w-4 h-4'></img><span className='text-green-500'>Approved</span></div>
          <div className='flex items-center'><img src={rejectDeactive} className='w-4 h-4'></img><span className=' text-gray-400 cursor-not-allowed'>Reject</span></div>
        </div>
      );
    } else if (status === 'Rejected') {
      return (
        <div className='flex items-center gap-8'>
          <div className='flex items-center'><img src={approveDeactive} className='w-4 h-4'></img><span className='text-gray-400 cursor-not-allowed'>Approve</span></div>
          <div className='flex items-center'><img src={rejectActive} className='w-4 h-4'></img><span className=' text-red-500'>Rejected</span></div>
        </div>
      );
    } else {
      return (
        <div className='flex items-center gap-8'>
          <button className='flex items-center' onClick={() => handleStatusChange(index, 'Approved')}><img src={approveActive} className='w-4 h-4'></img><div className='text-green-500'>Approve</div></button>
          <button className='flex items-center' onClick={() => handleStatusChange(index, 'Rejected')}><img src={rejectActive} className='w-4 h-4'></img><div className=' text-red-500'>Reject</div></button>
        </div>
      )
    }
  }

  return (
    <div className='p-6'>
      <h2 className="text-[20px] font-medium">Leave Request</h2>
      <div className='bg-white'>
        <div className='rounded-t-lg overflow-hidden mt-6 py-6 px-4'>
          <div className='rounded-t-lg overflow-hidden'>
            <table className='min-w-full bg-white rounded-lg'>
              <thead className="bg-[#465062] p-4 text-center font-normal text-sm text-white">
                <tr className='w-full'>
                  <th className="p-4 text-left font-normal text-sm">Employee ID</th>
                  <th className="p-4 text-left font-normal text-sm">Name</th>
                  <th className="p-4 text-left font-normal text-sm">Leave Type</th>
                  <th className="p-4 text-left font-normal text-sm">Applied On</th>
                  <th className="p-4 text-left font-normal text-sm">Department</th>
                  <th className="p-4 text-left font-normal text-sm">From</th>
                  <th className="p-4 text-left font-normal text-sm">To</th>
                  <th className="p-4 text-left font-normal text-sm">Days</th>
                  <th className="p-4 text-center font-normal text-sm">Action</th>
                </tr>
              </thead>
              <tbody className='text-[#373737]'>
                {leaveRequests.map((leaveRequest, index) => (
                  <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                    <th className="p-4 text-left font-normal text-sm">{leaveRequest.employeeId}</th>
                    <th className="p-4 text-left font-normal text-sm">{leaveRequest.name}</th>
                    <th className="p-4 text-left font-normal text-sm">{leaveRequest.leaveType}</th>
                    <th className="p-4 text-left font-normal text-sm">{leaveRequest.appliedOn}</th>
                    <th className="p-4 text-left font-normal text-sm">{leaveRequest.department}</th>
                    <th className="p-4 text-left font-normal text-sm">{leaveRequest.from}</th>
                    <th className="p-4 text-left font-normal text-sm">{leaveRequest.to}</th>
                    <th className="p-4 text-left font-normal text-sm">{leaveRequest.days}</th>
                    <th className="p-4 text-center font-normal text-sm">{renderActionButtons(leaveRequest.status, index)}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leave
