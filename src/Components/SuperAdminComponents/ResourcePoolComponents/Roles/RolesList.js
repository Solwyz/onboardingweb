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
    <div className='mt-8'>
      <h2 className='text-[24px] font-medium'>Role List</h2>
      <table className='table-auto w-full mt-4 border'>
        <thead>
          <tr className='bg-[#465062] h-[48px] text-white text-[16px]'>
            <th className='font-light'>Name</th>
            <th className='font-light'>Resource Manager</th>
            <th className='font-light'>Department</th>
            <th className='font-light'>Office</th>
            <th className='font-light'>Value Stream</th>
          </tr>
        </thead>
        <tbody>
          {RoleData.length > 0 ? (
            RoleData.map((role, index) => (
              <tr key={index} className='text-center'>
                <td className='px-4 py-2 border-b'>{role.name || 'N/A'}</td>
                <td className='px-4 py-2 border-b'>{role.resourceManager || 'N/A'}</td>
                <td className='px-4 py-2 border-b'>{role.department || 'N/A'}</td>
                <td className='px-4 py-2 border-b'>{role.office || 'N/A'}</td>
                <td className='px-4 py-2 border-b'>{role.valueStream || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className='px-4 py-2 border-b text-center' colSpan="5">
                No roles available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RolesList;
