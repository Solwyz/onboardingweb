import React, { useEffect, useState } from 'react';

function RolesList() {
  const [RoleData, setRoleData] = useState([]);

  useEffect(() => {
    // Fetch the data from localStorage on component mount
    const storedData = JSON.parse(localStorage.getItem('RoleData')) || [];
    setRoleData(storedData);
  }, []);

  useEffect(() => {
    // Set up a listener for storage events to update the table if data changes
    const handleStorageChange = () => {
      const updatedData = JSON.parse(localStorage.getItem('RoleData')) || [];
      setRoleData(updatedData);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className='mt-4'>

<div className='overflow-x-auto bg-white rounded-t-lg h-screen'>
  <table className='w-full border-none '>
    <thead className='bg-[#465062] h-[50px] text-white'>
      <tr className='bg-[#465062] h-[48px] text-white text-[16px]'>
        <th className='p-4 text-left font-normal text-sm'>Name</th>
        <th className='p-4 text-left font-normal text-sm'>Department</th>
        <th className='p-4 text-left font-normal text-sm'>Resource Manager</th>
        <th className='p-4 text-left font-normal text-sm'>Office</th>
      </tr>
    </thead>
    <tbody>
      {RoleData.length > 0 ? (
        RoleData.map((role, index) => (
          <tr key={index} className='border-b h-[48px] hover:bg-[#F9F9F9] text-[#373737] font-light'>
            <td className='p-4 text-left text-sm'>{role.name || 'N/A'}</td>
            <td className='p-4 text-left text-sm'>{role.department || 'N/A'}</td>
            <td className='p-4 text-left text-sm'>{role.resourceManager || 'N/A'}</td>
            <td className='p-4 text-left text-sm'>{role.office || 'N/A'}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td className='p-4 text-center text-sm' colSpan="4">
            No roles available
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

    </div>
  );
}

export default RolesList;
