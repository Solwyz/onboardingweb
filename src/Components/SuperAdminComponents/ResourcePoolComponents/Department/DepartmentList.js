import React, { useEffect, useState } from 'react';

function DepartmentList() {
    const [departmentData, setDepartmentData] = useState([]);

    useEffect(() => {
      // Fetch the data from localStorage on component mount
      const storedData = JSON.parse(localStorage.getItem('DepartmentData')) || [];
      setDepartmentData(storedData);
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
    <div className='mt-8'>
      <h2 className='text-[24px] font-medium'>Department List</h2>
      <table className='table-auto w-full mt-4 border'>
        <thead>
          <tr className='bg-[#465062] h-[48px] text-white text-[16px]'>
            <th className='font-light' scope="col">Name</th>
            <th className='font-light' scope="col">Resource Manager</th>
            <th className='font-light' scope="col">Office</th>
            <th className='font-light' scope="col">Value Stream</th>
          </tr>
        </thead>
        <tbody>
          {departmentData.length > 0 ? (
            departmentData.map((department, index) => (
              <tr key={index} className='text-center'>
                <td className='px-4 py-2 border-b'>{department.name || 'N/A'}</td>
                <td className='px-4 py-2 border-b'>{department.resourceManager || 'N/A'}</td>
                <td className='px-4 py-2 border-b'>{department.office || 'N/A'}</td>
                <td className='px-4 py-2 border-b'>{department.valueStream || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className='px-4 py-2 border-b text-center' colSpan="4">
                No departments available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentList;
