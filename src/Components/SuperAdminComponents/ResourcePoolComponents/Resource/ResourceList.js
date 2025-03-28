import React, { useState, useEffect } from 'react';
import Api from '../../../../Services/Api';
import editIcon from '../../../../Assets/Superadmin/edit-svgrepo-com.svg'
import deleteIcon from '../../../../Assets/Superadmin/delete.svg'
import { ClipLoader } from 'react-spinners';

function ResourceList() {
  const [teams, setTeams] = useState([]);
  const [deleteId, setDeleteId] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const token = localStorage.getItem('token');

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  }

  const handleEditClick = (id) => {
    console.log('edit id: ', id)
  }

  const handleDeleteModalCancel = () => {
    setDeleteModal(false);
  }

  const handleDeleteModalConfirm = () => {
    setIsDeleting(true);
    Api.delete(`api/teams/${deleteId}`, {
      'Authorization': `Bearer ${token}`
    })
    .then(response => {
      setIsDeleting(false);
      if(response && response.data){
        console.log(response)
        setRefreshKey(prev => prev + 1);
        setDeleteModal(false);
      } else {
        console.error('cant delete', response)
      }
    })
  }

  useEffect(() => {
    Api.get('api/teams', {
      'Authorization': `Bearer ${token}`
    })
      .then(response => {
        if (response && response.data) {
          console.log('teams response', response.data.content);
          setTeams(response.data.content);
        } else {
          console.error('Invalid teams response:', response)
        }
      })
  }, [refreshKey]);

  return (
    <div className='mt-4'>

      <div className='overflow-x-auto bg-white rounded-t-lg h-screen'>
        <table className='w-full border-none '>
          <thead className='bg-[#465062] h-[50px] text-white rounded-t-lg'>
            <tr className='bg-[#465062] h-[48px] text-white text-[16px]'>
              <th className='p-4 text-left font-normal text-sm'>Sl No</th>
              <th className='p-4 text-left font-normal text-sm'>Team Name</th>
              <th className='p-4 text-left font-normal text-sm'>Action</th>
            </tr>
          </thead>
          <tbody>

            {teams.map((team, index) => (
              <tr key={index} className='border-b hover:bg-[#F9F9F9] text-[#373737] font-light'>
                <td className='p-4 text-left text-sm'>{index + 1}</td>
                <td className='p-4 text-left text-sm'>{team.name}</td>
                <td className='p-4 text-left text-sm'>
                  <div className='flex items-center justify-center gap-4 w-fit'>
                    <img src={editIcon} className='h-3 w-3 hover:cursor-pointer' onClick={()=>handleEditClick(team.id)}></img>
                    <img src={deleteIcon} className='hover:cursor-pointer' onClick={()=>handleDeleteClick(team.id)}></img>
                  </div>
                </td>
              </tr>
            ))
            }
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

export default ResourceList;
