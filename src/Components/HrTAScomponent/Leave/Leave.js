import React, { useState, useEffect } from 'react';

import approveActive from '../../../Assets/HrTas/leaveRequest/check_circle (1).svg';
import approveDeactive from '../../../Assets/HrTas/leaveRequest/check_circle (2).svg';
import rejectActive from '../../../Assets/HrTas/leaveRequest/cancel.svg';
import rejectDeactive from '../../../Assets/HrTas/leaveRequest/cancel (1).svg';
import arrowLeft from '../../../Assets/HrTas/documentsPage/arrowLeft.svg';
import arrowRight from '../../../Assets/HrTas/documentsPage/arrowRight.svg';
import Api from '../../../Services/Api'

const token = localStorage.getItem('token');
console.log('token:', token);

function Leave() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(leaveRequests.length / itemsPerPage);

  // Fetch leave requests from the API
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await Api.get('api/leaveRequest', {
       
           'Authorization': `Bearer ${token}`,
        
        });
        setLeaveRequests(response.data.content);
        console.log("leave hrtas:",response.data.content)
        setError(null); // Clear error on successful fetch
      } catch (err) {
        console.error('Error fetching leave requests:', err);
        setError('Failed to fetch leave requests. Please try again later.');
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleApproved = async (index, newStatus) => {
    const leaveRequest = leaveRequests[index];
    console.log('iidddd',leaveRequest.id)
    try {
      await Api.put(`api/leaveRequest`, {
        "id": leaveRequest.id,
        "status": "APPROVED",
      },
    {'Authorization': `Bearer ${token}`})
    .then(response=> console.log('put response', response))
      const updatedLeaveRequests = [...leaveRequests];
      updatedLeaveRequests[index].status = newStatus;
      setLeaveRequests(updatedLeaveRequests);
      setError(null); // Clear error on successful update
    } catch (err) {
      console.error('Error updating leave request status:', err);
      setError('Failed to update leave request status. Please try again.');
    }
  };

  const handleRejected = async (index, newStatus) => {
    const leaveRequest = leaveRequests[index];
    console.log('iidddd',leaveRequest.id)
    try {
      await Api.put(`api/leaveRequest`, {
        "id": leaveRequest.id,
        "status": "REJECTED",
      },
    {'Authorization': `Bearer ${token}`})
    .then(response=> console.log('put response', response))
      const updatedLeaveRequests = [...leaveRequests];
      updatedLeaveRequests[index].status = newStatus;
      setLeaveRequests(updatedLeaveRequests);
      setError(null); // Clear error on successful update
    } catch (err) {
      console.error('Error updating leave request status:', err);
      setError('Failed to update leave request status. Please try again.');
    }
  };

  const renderActionButtons = (status, index) => {
    if (status === 'APPROVED') {
      return (
        <div className='flex items-center gap-6'>
          <div className='flex items-center'>
            <img src={approveActive} className='w-4 h-4' alt="Approved" />
            <span className='text-green-500'>Approved</span>
          </div>
          <div className='flex items-center'>
            <img src={rejectDeactive} className='w-4 h-4' alt="Reject Deactivated" />
            <span className='text-gray-400 cursor-not-allowed'>Reject</span>
          </div>
        </div>
      );
    } else if (status === 'REJECTED') {
      return (
        <div className='flex items-center gap-8'>
          <div className='flex items-center'>
            <img src={approveDeactive} className='w-4 h-4' alt="Approve Deactivated" />
            <span className='text-gray-400 cursor-not-allowed'>Approve</span>
          </div>
          <div className='flex items-center'>
            <img src={rejectActive} className='w-4 h-4' alt="Rejected" />
            <span className='text-red-500'>Rejected</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className='flex items-center gap-8'>
          <button
            className='flex items-center'
            onClick={() => handleApproved(index, 'APPROVED')}
          >
            <img src={approveActive} className='w-4 h-4' alt="Approve" />
            <div className='text-green-500'>Approve</div>
          </button>
          <button
            className='flex items-center'
            onClick={() => handleRejected(index, 'REJECTED')}
          >
            <img src={rejectActive} className='w-4 h-4' alt="Reject" />
            <div className='text-red-500'>Reject</div>
          </button>
        </div>
      );
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = leaveRequests.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='p-6'>
      <h2 className="text-[20px] font-medium">Leave Requests</h2>
      <div className='bg-white h-screen'>
        {/* Error Message */}
        {error && (
          <div className="text-red-500 bg-red-100 p-4 rounded-md mb-4">
            {error}
          </div>
        )}

        <div className='rounded-t-lg overflow-hidden mt-6 py-6 px-4'>
          <table className='min-w-full bg-white rounded-lg'>
            <thead className="bg-[#465062] p-4 rounded-lg text-center font-normal text-sm text-white">
              <tr>
                <th className="p-4 text-left font-normal rounded-tl-lg text-sm">Employee ID</th>
                <th className="p-4 text-left font-normal text-sm">Name</th>
                <th className="p-4 text-left font-normal text-sm">Leave Type</th>
                <th className="p-4 text-left font-normal text-sm">Applied On</th>
                <th className="p-4 text-left font-normal text-sm">Department</th>
                <th className="p-4 text-left font-normal text-sm">From</th>
                <th className="p-4 text-left font-normal text-sm">To</th>
                <th className="p-4 text-left font-normal text-sm">Days</th>
                <th className="p-4 text-center font-normal rounded-tr-lg text-sm">Action</th>
              </tr>
            </thead>
            
            <tbody className='text-[#373737]'>
               {Array.isArray(leaveRequests) && leaveRequests.map((leaveRequest, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                  <td className="p-4 text-sm">{leaveRequest.id}</td>
                  <td className="p-4 text-sm">{leaveRequest.employee?.basicDetails?.firstName}</td>
                  <td className="p-4 text-sm">{leaveRequest.leaveType}</td>
                  <td className="p-4 text-sm">{leaveRequest.createdAt}</td>
                  <td className="p-4 text-sm">{leaveRequest.employee?.basicDetails?.department?.departmentName}</td>
                  <td className="p-4 text-sm">{leaveRequest.startDate}</td>
                  <td className="p-4 text-sm">{leaveRequest.endDate}</td>
                  <td className="p-4 text-sm">{leaveRequest.days}</td>
                  <td className="p-4 text-sm text-center">
                    {renderActionButtons(leaveRequest.status, indexOfFirstItem + index)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
              className={`p-2 rounded-md ${
                currentPage === i + 1 ? 'text-[#373737]' : 'text-[#C8C8C8]'
              }`}
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
