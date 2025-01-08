import React, { useState, useEffect } from 'react';

function ResourceList() {
  const [resourceData, setResourceData] = useState([]);


  useEffect(() => {
    // // Fetch the data from localStorage on component mount
    // const storedData = JSON.parse(localStorage.getItem('resourceData')) || [];
    // setResourceData(storedData);
  }, []);

  return (
    <div className='mt-4'>

      <div className='overflow-x-auto bg-white rounded-t-lg h-screen'>

        <table className='w-full border-none '>

          <thead className='bg-[#465062] h-[50px] text-white'>
            <tr className='bg-[#465062] h-[48px] text-white text-[16px]'>
              <th className='p-4 text-left font-normal text-sm'>Name</th>
              <th className='p-4 text-left font-normal text-sm'>Primary Role</th>
              <th className='p-4 text-left font-normal text-sm'>Resource Manager</th>
              <th className='p-4 text-left font-normal text-sm'>Office</th>
            </tr>
          </thead>
          <tbody>

            {resourceData.map((resource, index) => (
              <tr key={index} className='border-b hover:bg-[#F9F9F9] text-[#373737] font-light'>
                <td className='p-4 text-left text-sm'>{resource.firstName}</td>
                <td className='p-4 text-left text-sm'>{resource.primaryRole}</td>
                <td className='p-4 text-left text-sm'>{resource.resourceManager}</td>
                <td className='p-4 text-left text-sm'>{resource.city}</td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResourceList;
