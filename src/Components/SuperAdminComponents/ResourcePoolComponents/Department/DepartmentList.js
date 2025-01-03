import React, { useEffect, useState } from 'react';
import Api from '../../../../Services/Api';
import axios from 'axios';

function DepartmentList() {
  const [departmentData, setDepartmentData] = useState([]);

  const token = localStorage.getItem('token')

  useEffect(() => {

    Api.get('api/department', {
        'Authorization': `Bearer ${token}`
    })
    .then(response => {
      if(response && response.data) {
        console.log('bbbb',response.data.content)
        setDepartmentData(response.data.content)
      } else {
        console.error('Invalid response data:', response)
        alert('Can not fetch data. Please try again')
      }
      
    })

    // // Fetch the data from localStorage on component mount
    // const storedData = JSON.parse(localStorage.getItem('DepartmentData')) || [];
    // setDepartmentData(storedData);
  }, []);

  useEffect(() => {

    // Set up a listener for storage events to update the table if data changes
    const handleStorageChange = () => {
      const updatedData = JSON.parse(localStorage.getItem('DepartmentData')) || [];
      setDepartmentData(updatedData);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    
      <div className='mt-4 '>
        <div className='overflow-x-auto bg-white rounded-t-lg h-screen'>
  
          <table className='w-full border-none '>
            <thead className='bg-[#465062] h-[50px] text-white'>
              <tr className='bg-[#465062] h-[48px] text-white text-[16px]'>
                <th className='p-4 text-left font-normal text-sm' scope="col">Name</th>
                <th className='p-4 text-left font-normal text-sm' scope="col">Resource Manager</th>
                <th className='p-4 text-left font-normal text-sm' scope="col">Office</th>
                <th className='p-4 text-left font-normal text-sm' scope="col">Value Stream</th>
              </tr>
            </thead>
            <tbody>
              {departmentData.length > 0 ? (
                departmentData.map((department, index) => (
                  <tr key={index} className='border-b  hover:bg-[#F9F9F9] text-[#373737] font-light'>
                    <td className='p-4 text-left text-sm'>{department.departmentName || 'N/A'}</td>
                    <td className='p-4 text-left text-sm'>{department.createdBy || 'N/A'}</td>
                    <td className='p-4 text-left text-sm'>{department.office || 'N/A'}</td>
                    <td className='p-4 text-left text-sm'>{department.valueStream || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className='p-4 text-left text-sm' colSpan="4">
                    No departments available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      
    </div>
  );
}

export default DepartmentList;
