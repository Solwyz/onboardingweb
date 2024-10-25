import React, { useState } from 'react';
import approveActive from '../../../Assets/HrTas/leaveRequest/check_circle (1).svg';
import approveDeactive from '../../../Assets/HrTas/leaveRequest/check_circle (2).svg';
import rejectActive from '../../../Assets/HrTas/leaveRequest/cancel.svg';
import rejectDeactive from '../../../Assets/HrTas/leaveRequest/cancel (1).svg';
import arrowLeft from '../../../Assets/HrTas/documentsPage/arrowLeft.svg';
import arrowRight from '../../../Assets/HrTas/documentsPage/arrowRight.svg';

function Leave() {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      employeeId: "AT96562",
      name: "Aswin Syam",
      leaveType: "Casual",
      appliedOn: "24/07/2024",
      department: "Development",
      from: "24/07/2024",
      to: "24/07/2024",
      days: 1,
      status: "Pending"
    },
    {
      employeeId: "AT96563",
      name: "Emmanuel",
      leaveType: "Sick",
      appliedOn: "24/07/2024",
      department: "Graphics",
      from: "24/07/2024",
      to: "24/07/2024",
      days: 2,
      status: "Approved"
    },
    {
      employeeId: "AT96564",
      name: "Nizam",
      leaveType: "Casual",
      appliedOn: "24/07/2024",
      department: "Finance",
      from: "24/07/2024",
      to: "24/07/2024",
      days: 1,
      status: "Rejected"
    },
    {
      employeeId: "AT96565",
      name: "Raaj B",
      leaveType: "Casual",
      appliedOn: "24/07/2024",
      department: "Store",
      from: "24/07/2024",
      to: "24/07/2024",
      days: 2,
      status: "Approved"
    },
    {
      employeeId: "AT96566",
      name: "dAswinssd Syam",
      leaveType: "Casual",
      appliedOn: "24/07/2024",
      department: "Development",
      from: "24/07/2024",
      to: "24/07/2024",
      days: 1,
      status: "Pending"
    },
    {
      employeeId: "AT96567",
      name: "dEmmasdsnuel",
      leaveType: "Sick",
      appliedOn: "24/07/2024",
      department: "Graphics",
      from: "24/07/2024",
      to: "24/07/2024",
      days: 2,
      status: "Approved"
    },
    {
      employeeId: "AT96568",
      name: "dNizassm",
      leaveType: "Casual",
      appliedOn: "24/07/2024",
      department: "Finance",
      from: "24/07/2024",
      to: "24/07/2024",
      days: 1,
      status: "Rejected"
    },
    {
      employeeId: "AT96569",
      name: "dRaajsds B",
      leaveType: "Casual",
      appliedOn: "24/07/2024",
      department: "Store",
      from: "24/07/2024",
      to: "24/07/2024",
      days: 2,
      status: "Approved"
    },
    {
      employeeId: "AT96566",
      name: "dAswinsds Syam",
      leaveType: "Casual",
      appliedOn: "24/07/2024",
      department: "Development",
      from: "24/07/2024",
      to: "24/07/2024",
      days: 1,
      status: "Pending"
    },
    {
      employeeId: "AT96567",
      name: "dEmmasdnuel",
      leaveType: "Sick",
      appliedOn: "24/07/2024",
      department: "Graphics",
      from: "24/07/2024",
      to: "24/07/2024",
      days: 2,
      status: "Approved"
    },
    {
      employeeId: "AT96568",
      name: "dNizasd",
      leaveType: "Casual",
      appliedOn: "24/07/2024",
      department: "Finance",
      from: "24/07/2024",
      to: "24/07/2024",
      days: 1,
      status: "Rejected"
    },
    {
      employeeId: "AT96569",
      name: "dRsdfg B",
      leaveType: "Casual",
      appliedOn: "24/07/2024",
      department: "Store",
      from: "24/07/2024",
      to: "24/07/2024",
      days: 2,
      status: "Approved"
    }
  ]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of requests per page
  const totalPages = Math.ceil(leaveRequests.length / itemsPerPage);

  const handleStatusChange = (index, newStatus) => {
    const updatedLeaveRequests = [...leaveRequests];
    updatedLeaveRequests[index].status = newStatus;
    setLeaveRequests(updatedLeaveRequests);
  };

  const renderActionButtons = (status, index) => {
    if (status === 'Approved') {
      return (
        <div className='flex items-center gap-6'>
          <div className='flex items-center'><img src={approveActive} className='w-4 h-4' alt="Approved" /><span className='text-green-500'>Approved</span></div>
          <div className='flex items-center'><img src={rejectDeactive} className='w-4 h-4' alt="Reject Deactivated" /><span className=' text-gray-400 cursor-not-allowed'>Reject</span></div>
        </div>
      );
    } else if (status === 'Rejected') {
      return (
        <div className='flex items-center gap-8'>
          <div className='flex items-center'><img src={approveDeactive} className='w-4 h-4' alt="Approve Deactivated" /><span className='text-gray-400 cursor-not-allowed'>Approve</span></div>
          <div className='flex items-center'><img src={rejectActive} className='w-4 h-4' alt="Rejected" /><span className=' text-red-500'>Rejected</span></div>
        </div>
      );
    } else {
      return (
        <div className='flex items-center gap-8'>
          <button className='flex items-center' onClick={() => handleStatusChange(index, 'Approved')}><img src={approveActive} className='w-4 h-4' alt="Approve" /><div className='text-green-500'>Approve</div></button>
          <button className='flex items-center' onClick={() => handleStatusChange(index, 'Rejected')}><img src={rejectActive} className='w-4 h-4' alt="Reject" /><div className=' text-red-500'>Reject</div></button>
        </div>
      )
    }
  };

  // Handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate items to display for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = leaveRequests.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='p-6'>
      <h2 className="text-[20px] font-medium">Leave Requests</h2>
      <div className='bg-white h-screen'>
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
                {currentRequests.map((leaveRequest, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                    <td className="p-4 text-left font-normal text-sm">{leaveRequest.employeeId}</td>
                    <td className="p-4 text-left font-normal text-sm">{leaveRequest.name}</td>
                    <td className="p-4 text-left font-normal text-sm">{leaveRequest.leaveType}</td>
                    <td className="p-4 text-left font-normal text-sm">{leaveRequest.appliedOn}</td>
                    <td className="p-4 text-left font-normal text-sm">{leaveRequest.department}</td>
                    <td className="p-4 text-left font-normal text-sm">{leaveRequest.from}</td>
                    <td className="p-4 text-left font-normal text-sm">{leaveRequest.to}</td>
                    <td className="p-4 text-left font-normal text-sm">{leaveRequest.days}</td>
                    <td className="p-4 text-center font-normal text-sm">{renderActionButtons(leaveRequest.status, indexOfFirstItem + index)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-end align-middle mt-8">
          <button
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            className={`p-2 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={currentPage === 1}
          >
            <img src={arrowLeft} alt="Previous" />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`p-2 rounded-md ${currentPage === i + 1 ? 'text-[#373737] font-normal text-sm' : 'text-[#C8C8C8] text-sm font-normal'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
            className={`p-2 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={currentPage === totalPages}
          >
            <img src={arrowRight} alt="Next" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Leave;
