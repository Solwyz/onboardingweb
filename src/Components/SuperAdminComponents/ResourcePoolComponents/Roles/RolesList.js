import React, { useEffect, useState } from 'react';

function RolesList() {
    const [RoleData, setRoleData] = useState([]);

    useEffect(() => {
      // Fetch the data from localStorage on component mount
      const storedData = JSON.parse(localStorage.getItem('RoleData')) || [];
      setRoleData(storedData);
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
                    {RoleData.map((role, index) => (
                        <tr key={index} className='text-center'>
                            <td className='px-4 py-2 border-b'>{role.name}</td>
                            <td className='px-4 py-2 border-b'>{role.resourceManager}</td>
                            <td className='px-4 py-2 border-b'>{role.department}</td>
                            <td className='px-4 py-2 border-b'>{role.office}</td>
                            <td className='px-4 py-2 border-b'>{role.valueStream}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RolesList;
