import React from 'react'

function Leave() {
  return (
    <div className='p-6'>
      <h2 className="text-[20px] font-medium">Leave Request</h2>
      <div className='mt-6'>
      <div className="overflow-x-auto mt-[16px] rounded-t-lg shadow-lg">
      <table className='w-full'>
        <thead className='bg-[#465062] h-12'>
            <tr className='text-white text-[14px] font-medium'>
                <th className='text-left'>Employee ID</th>
                <th className='text-left'>Name</th>
                <th className='text-left'>Leave Type</th>
                <th className='text-left'>Applied On</th>
                <th className='text-left'>Department</th>
                <th className='text-left'>From</th>
                <th className='text-left'>To</th>
                <th className='text-left'>Days</th>
                <th className='text-left'>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr></tr>
        </tbody>
      </table>
      </div>
      </div>
      <div></div>
    </div>
  )
}

export default Leave
