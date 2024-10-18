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
      

      <table className='table-auto w-full mt-4 border'>

        <thead>
          <tr className='bg-[#465062] h-[48px] text-white text-[16px]'>
            <th className='font-light'>Name</th>
            <th className='font-light'>Primary Role</th>
            <th className='font-light'>Resource Manager</th>
            <th className='font-light'>Office</th>
          </tr>
        </thead>
        <tbody>
          {resourceData.map((resource, index) => (
            <tr key={index} className='text-center'>
              <td className='px-4 py-2 border-b'>{resource.firstName}</td>
              <td className='px-4 py-2 border-b'>{resource.primaryRole}</td>
              <td className='px-4 py-2 border-b'>{resource.resourceManager}</td>
              <td className='px-4 py-2 border-b'>{resource.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResourceList;
