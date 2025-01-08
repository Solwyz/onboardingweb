import React, { useEffect, useState } from 'react';
import Api from '../../../../Services/Api';
import editIcon from '../../../../Assets/Superadmin/edit-svgrepo-com.svg'
import deleteIcon from '../../../../Assets/Superadmin/delete.svg'
import { ClipLoader } from 'react-spinners';

function RolesList() {
  const [RoleData, setRoleData] = useState([]);
  const [deleteId, setDeleteId] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const token = localStorage.getItem('token')

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  }

  const handleDeleteModalCancel = () => {
    setDeleteModal(false)
  }

  const handleDeleteModalConfirm = () => {
    setIsDeleting(true)
    console.log('delete id: ', deleteId)
    Api.delete(`api/roles/${deleteId}`, {
      'Authorization': `Bearer ${token}`
    })
      .then(response => {
        setIsDeleting(false)
        if (response && response.data) {
          console.log(response.data.message)
          setRefreshKey(prev => prev + 1);
          setDeleteModal(false)
        } else {
          console.error('Invalid response data: ', response)
          alert('Can not fetch data. Please try again')
        }
      })
  }

  useEffect(() => {

    Api.get('api/roles', {
      'Authorization': `Bearer ${token}`
    })
      .then(response => {
        if (response && response.data) {
          setRoleData(response.data.content)
          console.log('rollsList:', response.data.content)
        } else {
          console.error('Invalid response data:', response)
          alert('Can not fetch data. Please try again')
        }
      })

    // Fetch the data from localStorage on component mount
    // const storedData = JSON.parse(localStorage.getItem('RoleData')) || [];
    // setRoleData(storedData);
  }, [refreshKey]);

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
              <th className='p-4 text-left font-normal text-sm'>Role</th>
              <th className='p-4 text-left font-normal text-sm'>Office</th>
              <th className='p-4 text-left font-normal text-sm'>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {RoleData.length > 0 ? (
              RoleData.map((role, index) => (
                <tr key={index} className='border-b h-[48px] hover:bg-[#F9F9F9] text-[#373737] font-light'>
                  <td className='p-4 text-left text-sm'>{role.name || 'N/A'}</td>
                  <td className='p-4 text-left text-sm'>{role.roleType || 'N/A'}</td>
                  <td className='p-4 text-left text-sm'>{role.description || 'N/A'}</td>
                  <td className='p-4 text-left text-sm'>{role.createdAt || 'N/A'}</td>
                  <td className='p-4 text-left text-sm'>
                    <div className='flex items-center justify-center gap-4 w-fit'>
                      <img src={editIcon} className='h-3 w-3 hover:cursor-pointer'></img>
                      <img src={deleteIcon} className='hover:cursor-pointer' onClick={() => handleDeleteClick(role.id)}></img>
                    </div>
                  </td>
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

      {deleteModal && (
        <div className="fixed inset-0 bg-neutral-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-auto p-10  shadow-lg">
            {isDeleting ?
              <div className='px-4'>
                <div>
                  <ClipLoader
                    color={'#465062'}
                    loading={true}
                    size={35}
                    aria-label="Loading Spinner"
                    data-testid="Loader"
                  />
                </div>
                <div className='mt-2'>Deleing Please wait..</div>
              </div> :
              <div>
                <div className='text-[18px] text-[#373737]'>Are you sure to delete this data ?</div>
                <div className='flex gap-4 mt-8 w-fit ml-auto'>
                  <button className='bg-[#405170] hover:bg-[#232E42] w-[72px] h-[42px] text-white font-light rounded-[8px]' onClick={handleDeleteModalCancel}>Cancel</button>
                  <button className='bg-[#405170] hover:bg-[#232E42] w-[72px] h-[42px] text-white font-light rounded-[8px]' onClick={handleDeleteModalConfirm}>Delete</button>
                </div>
              </div>
            }
          </div>
        </div>
      )}


    </div>
  );
}

export default RolesList;
