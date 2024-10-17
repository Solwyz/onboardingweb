import React, { useState, useEffect } from 'react';

function ResourceList() {
  const [resourceData, setResourceData] = useState([]);

  useEffect(() => {
    // Fetch the data from localStorage on component mount
    const storedData = JSON.parse(localStorage.getItem('resourceData')) || [];
    setResourceData(storedData);
  }, []);

  return (
    <div className='mt-8'>
      <h2 className='text-[24px] font-medium'>Resource List</h2>
      <table className='table-auto w-full mt-4 border'>
        <thead>
          <tr className='bg-[#465062] h-[48px] text-white text-[16px]'>
            <th className='font-light'>First Name</th>
            <th className='font-light'>Last Name</th>
            <th className='font-light'>Email</th>
            <th className='font-light'>Role</th>
            <th className='font-light'>City</th>
          </tr>
        </thead>
        <tbody>
          {resourceData.map((resource, index) => (
            <tr key={index} className='text-center'>
              <td className='px-4 py-2 border-b'>{resource.firstName}</td>
              <td className='px-4 py-2 border-b'>{resource.lastName}</td>
              <td className='px-4 py-2 border-b'>{resource.email}</td>
              <td className='px-4 py-2 border-b'>{resource.primaryRole}</td>
              <td className='px-4 py-2 border-b'>{resource.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResourceList;
