import React, { useEffect, useState } from 'react';
import Announcement from "../../../../Assets/HrTas/Announcement.svg";
import AddBtn from "../../../../Assets/HrTas/add.svg";
import BrandAwareness from "../../../../Assets/HrTas/brand_awareness.svg";
import CloseBtn from "../../../../Assets/HrTas/close.svg";
import Api from '../../../../Services/Api';
import editIcon from '../../../../Assets/Superadmin/edit-svgrepo-com.svg'
import deleteIcon from '../../../../Assets/Superadmin/delete.svg'
import './AnnouncementPage.css'
import { ClipLoader } from 'react-spinners';

const token = localStorage.getItem('token')

function Modal({ onClose, onSubmit, setIsModalOpen, setRefreshKey }) {
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [isAdding, setIsAdding] = useState(false)

  const isValid = headline && description && author


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAdding(true)
    Api.post('api/announcement', {
      "title": headline,
      "message": description,
      "author": author
    }, { 'Authorization': `Bearer ${token}` })
      .then(response => {
        setIsAdding(false)
        setIsModalOpen(false)
        if (response && response.data) {
          console.log('New Announcement added', response.data)
          setRefreshKey(prev => prev + 1);
        } else {
          console.log('Failed to add new announcement. Please try again')
          alert('Announcement not added. please try again')
        }
      })

    // if (headline && description) {
    //   onSubmit({ headline, description });
    //   setHeadline('');
    //   setDescription('');
    //   onClose();
    // }
  };



  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6  w-[504px]">
        <div className='flex items-center justify-between'>
          <h2 className="text-[16px] font-medium">Add Announcement</h2>
          <img onClick={onClose} src={CloseBtn} alt="" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 mt-6">
            <input
              id="headline"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none sm:text-sm"
              placeholder="Enter the headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <textarea
              id="description"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none h-[104px] sm:text-sm"
              placeholder="Enter the description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-4 mt-6">
            <input
              id="author"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none sm:text-sm"
              placeholder="Enter the author's name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border text-gray-800 rounded-lg "
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className={`px-4 py-2 text-white rounded-md ml-4 bg-[#6C55B2] ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isAdding ?
                <div>
                  <ClipLoader
                    color={'#ffffff'}
                    loading={true}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="Loader"
                  />
                </div> :
                <div>Add</div>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AnnouncementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [announcementError, setAnnouncementError] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)
  const [deleteId, setDeleteId] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [updateAnnouncement, setUpdateAnnouncement] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [newFormData, setNewFormData] = useState({
    id: '',
    headline: '',
    description: '',
    author: ''
  })


  const handleEditClick = (id) => {
    const announcementTobeUpdated = announcements.find(announcement => announcement.id == id)
    setUpdateAnnouncement(announcementTobeUpdated)
    setIsEditModalOpen(true)
    setNewFormData({
      id: announcementTobeUpdated.id,
      headline: announcementTobeUpdated.title,
      description: announcementTobeUpdated.message,
      author: announcementTobeUpdated.author
    })
  }

  const handleEditModalCancel = () => {
    setIsEditModalOpen(false)
  }

  const handleEditModalUpdate = () => {
    setIsUpdating(true)
    Api.put('api/announcement', {
      "id": newFormData.id,
      "title": newFormData.headline,
      "message": newFormData.description,
      "author": newFormData.author
    }, { 'Authorization': `Bearer ${token}` })
      .then(response => {
        setIsUpdating(false)
        setRefreshKey(prev => prev + 1)
        setIsEditModalOpen(false)
        console.log('satsss:', response)
      })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  }

  const handleDeleteModalCancel = () => {
    setDeleteModal(false);
  }

  const handleDeleteModalConfirm = () => {
    setIsDeleting(true);
    console.log('delete ID: ', deleteId);
    Api.delete(`api/announcement/${deleteId}`, {
      'Authorization': `Bearer ${token}`
    })
      .then(response => {
        setIsDeleting(false);
        if (response && response.data) {
          console.log(response.data.message)
          setRefreshKey(prev => prev + 1)
          setDeleteModal(false)
        } else {
          console.error('Invalid response data: ', response)
          alert('Can not delete, Please try again.')
        }
      })
  }

  const handleNewAnnouncement = (announcement) => {
    // setAnnouncements([...announcements, announcement]);
  };

  useEffect(() => {
    Api.get('api/announcement', {
      'Authorization': `Bearer ${token}`
    })
      .then(response => {
        if (response.data && response.data.content) {
          console.log('Announce resp: ', response.data.content)
          setAnnouncements(response.data.content)
        } else {
          console.error('Invalid response data:', response)
          setAnnouncementError('Failed to fetch Announcements data !')
        }
      })
    // .catch((error) => {
    //   console.error('dot catch error :', error);
    //   setAnnouncementError('Failed to fetch data')
    // })
  }, [refreshKey])

  return (
    <div>
      <div className='flex justify-between items-center    '>
        <div className='flex items-center justify-start'>
          <img className='w-5 h-5' src={Announcement} alt="Notification" />
          <h1 className='text-[20px] font-medium text-[#1255D0] ml-1 '>Announcement</h1>
        </div>
        <div className='flex'>
          <button
            className='border text-[12px] font-normal flex items-center px-4 py-2 rounded-lg ml-2'
            onClick={() => setIsModalOpen(true)}
          >
            <img className='w-4 h-4 mr-1' src={AddBtn} alt="" /> Create New
          </button>
        </div>
      </div>

      {announcementError ? 
      <div className='text-red-600 mt-8'>{announcementError}</div> :

        <div className="h-[224px] overflow-y-auto  mr-6 mt-[20px] ">
          {announcements.map((announcement, index) => (
            <div className="flex mb-4 items-center justify-between" key={index}>
              <div className="flex">
                <img src={BrandAwareness} alt="" />
                <div className="ml-3 text-[14px]">
                  <h1 className="font-medium">{announcement.title}</h1>
                  <p className="font-normal text-[#696A70] text-justify w-[380px]">{announcement.message}</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4">
                <img
                  src={editIcon}
                  className="h-3 w-3 hover:cursor-pointer"
                  onClick={() => handleEditClick(announcement.id)}
                />
                <img
                  src={deleteIcon}
                  className="hover:cursor-pointer"
                  onClick={() => handleDeleteClick(announcement.id)}
                />
              </div>
            </div>
          ))}
        </div>


      }

      {deleteModal && (
        <div className="fixed inset-0 bg-neutral-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-auto p-10  shadow-lg">
            {isDeleting ?
              <div className='flex gap-4 px-4'>
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
                <div className='text-[18px] text-[#373737]'>Are you sure to delete this Announcement ?</div>
                <div className='flex gap-4 mt-8 w-fit ml-auto'>
                  <button className='bg-[#405170] hover:bg-[#232E42] w-[72px] h-[42px] text-white font-light rounded-[8px]' onClick={handleDeleteModalCancel}>Cancel</button>
                  <button className='bg-[#405170] hover:bg-[#232E42] w-[72px] h-[42px] text-white font-light rounded-[8px]' onClick={handleDeleteModalConfirm}>Delete</button>
                </div>
              </div>
            }
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6  w-[504px]">
            {isUpdating ?
              <div className='flex gap-4 px-4'>
                <div>
                  <ClipLoader
                    color={'#465062'}
                    loading={true}
                    size={35}
                    aria-label="Loading Spinner"
                    data-testid="Loader"
                  />
                </div>
                <div className='mt-2'>Updating Please wait..</div>
              </div> :
              <div>
                <div className='flex items-center justify-between'>
                  <h2 className="text-[16px] font-medium">Update Announcement</h2>
                </div>

                <form>
                  <div className="mb-4 mt-6">
                    <input
                      name="headline"
                      type="text"
                      value={newFormData.headline}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none sm:text-sm"
                      placeholder="Enter the headline"
                    />
                  </div>

                  <div className="mb-4">
                    <textarea
                      name="description"
                      value={newFormData.description}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none h-[104px] sm:text-sm"
                      placeholder="Enter the description"
                    />
                  </div>

                  <div className="mb-4 mt-6">
                    <input
                      name="author"
                      type="text"
                      value={newFormData.author}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 focus:outline-none sm:text-sm"
                      placeholder="Enter the author's name"
                    />
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      type="button"
                      className="px-4 py-2 border text-gray-800 rounded-lg "
                      onClick={handleEditModalCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 text-white rounded-md ml-4 bg-[#6C55B2]`}
                      onClick={handleEditModalUpdate}
                    >

                      <div>Update</div>
                    </button>
                  </div>
                </form>
              </div>
            }

          </div>
        </div>
      )}

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} onSubmit={handleNewAnnouncement} setIsModalOpen={setIsModalOpen} setRefreshKey={setRefreshKey} />}
    </div>
  );
}

export default AnnouncementPage;
