import React, { useEffect, useState } from 'react';
import Api from '../../../../Services/Api';
import axios from 'axios';
import editIcon from '../../../../Assets/Superadmin/edit-svgrepo-com.svg'
import deleteIcon from '../../../../Assets/Superadmin/delete.svg'
import { ClipLoader } from 'react-spinners'

function DepartmentList() {
  const [departmentData, setDepartmentData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    resourceManager: '',
    office: ''
  })

  const isFormValid = formData.name && formData.resourceManager && formData.office;

  const token = localStorage.getItem('token')


  const handleDeleteModalCancle = () => {
    setDeleteModal(false)
  }

  const handleDeleteModalConfirm =()=> {
    console.log('abccc',deleteId)
    Api.delete(`api/department/${deleteId}`, {
      'Authorization': `Bearer ${token}`
    })
      .then(response => {
        if (response && response.data) {
          console.log(response.data.message)
          setDeleteModal(false)
          setRefreshKey(prev => prev + 1);
        } else {
          console.error('Invalid response data:', response)
          alert('Can not fetch data. Please try again')
        }
      })
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleUpdate = () => {
    setIsUpdating(true)
    Api.put('api/department', {
      "id": formData.id,
      "departmentName": formData.name,
      "createdBy": formData.resourceManager,
      "createdAt": formData.office
    }, { 'Authorization': `Bearer ${token}` })
      .then(response => {
        setIsUpdating(false)
        setIsModalOpen(false)
        console.log(response)
        setRefreshKey(prev => prev + 1);
      })
  }



  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  }

  const handleEditClick = (id) => {
    const dataTobeUpdated = departmentData.find(dept => dept.id == id)
    console.log(dataTobeUpdated)
    setIsModalOpen(true)
    setFormData({
      id: dataTobeUpdated.id,
      name: dataTobeUpdated.departmentName,
      resourceManager: dataTobeUpdated.createdBy,
      office: dataTobeUpdated.createdAt
    })
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
    setFormData({
      name: '',
      resourceManager: '',
      office: ''
    })
    setIsModalOpen(false)
  }

  useEffect(() => {

    Api.get('api/department', {
      'Authorization': `Bearer ${token}`
    })
      .then(response => {
        if (response && response.data) {
          setDepartmentData(response.data.content)
          console.log('departmenttt',response.data.content)
        } else {
          console.error('Invalid response data:', response)
          alert('Can not fetch data. Please try again')
        }

      })

    // // Fetch the data from localStorage on component mount
    // const storedData = JSON.parse(localStorage.getItem('DepartmentData')) || [];
    // setDepartmentData(storedData);
  }, [refreshKey]);

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
              <th className='p-4 text-left font-normal text-sm' scope="col">Work Mobile</th>
              <th className='p-4 text-left font-normal text-sm' scope="col">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {departmentData.length > 0 ? (
              departmentData.map((department, index) => (
                <tr key={index} className='border-b  hover:bg-[#F9F9F9] text-[#373737] font-light'>
                  <td className='p-4 text-left text-sm'>{department.departmentName || 'N/A'}</td>
                  <td className='p-4 text-left text-sm'>{department.manager || 'N/A'}</td>
                  <td className='p-4 text-left text-sm'>{department.workMobile || 'N/A'}</td>
                  <td className='p-4 text-left text-sm'>
                    <div className='flex items-center justify-center gap-4 w-fit'>
                      <img src={editIcon} className='h-3 w-3 hover:cursor-pointer' onClick={() => handleEditClick(department.id)}></img>
                      <img src={deleteIcon} onClick={() => handleDelete(department.id)} className='hover:cursor-pointer'></img>
                    </div>
                  </td>
                  {/* <td className='p-4 text-left text-sm'>{department.valueStream || 'N/A'}</td> */}
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-neutral-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-auto px-6 py-4  shadow-lg">

            {isUpdating ?
              <div className='p-4'>
                <div>
                  <ClipLoader
                    color={'#465062'}
                    loading={true}
                    size={35}
                    aria-label="Loading Spinner"
                    data-testid="Loader"
                  />
                </div>
                <div className='mt-2'>Upading Please wait..</div>
              </div> :
              <form className="mt-[36px]">
                <div className='flex gap-4'>

                  <div className="mb-4">
                    <label className="block text-sm font-normal text-[#373737]">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="block w-[247px] h-[48px] border border-[#E6E6E7] rounded-[8px] text-sm font-normal text-[#696A70] mt-[8px] py-2 px-3 focus:outline-none"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-normal text-[#373737]">Resource Manager</label>
                    <input
                    type='text'
                      name="resourceManager"
                      className="block w-[247px] h-[48px] border border-[#E6E6E7] text-sm font-normal text-[#696A70] rounded-[8px] mt-[8px] py-2 px-3 focus:outline-none"
                      value={formData.resourceManager}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-[24px]">
                  <div>
                    <label className="block text-sm font-normal text-[#373737]">Office</label>
                    <input
                      type="text"
                      name="office"
                      className="block w-[247px] h-[48px] border border-[#E6E6E7] text-sm font-normal text-[#696A70] rounded-[8px] mt-[8px] py-2 px-3 focus:outline-none"
                      value={formData.office}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-[24px] mr-[24px] mb-[24px] col-span-2 gap-2">
                  <button className='bg-[#405170] hover:bg-[#232E42] w-[107px] h-[48px] text-white font-medium px-6 py-2 rounded-[8px]' onClick={handleCancelClick}>Cancel</button>
                  <button
                    onClick={handleUpdate}
                    disabled={!isFormValid}
                    className={`bg-[#405170] hover:bg-[#232E42] w-[107px] h-[48px] text-white font-medium px-6 py-2 rounded-[8px] ${(!isFormValid) ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    Update
                  </button>
                </div>

              </form>
            }
          </div>
        </div>
      )}

      {deleteModal && (
        <div className="fixed inset-0 bg-neutral-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-auto p-10  shadow-lg">
            <div className='text-[18px] text-[#373737]'>Are you sure to delete this data ?</div>
            <div className='flex gap-4 mt-8 w-fit ml-auto'>
              <button className='bg-[#405170] hover:bg-[#232E42] w-[72px] h-[42px] text-white font-light rounded-[8px]' onClick={handleDeleteModalCancle}>Cancel</button>
              <button className='bg-[#405170] hover:bg-[#232E42] w-[72px] h-[42px] text-white font-light rounded-[8px]' onClick={handleDeleteModalConfirm}>Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default DepartmentList;
