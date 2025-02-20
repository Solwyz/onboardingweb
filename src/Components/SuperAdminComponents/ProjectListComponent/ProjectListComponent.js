import React, { useEffect, useState } from 'react'
import addIcon from "../../../Assets/HrTas/addIcon.svg";
import CloseBtn from "../../../Assets/HrTas/close.svg";
import deleteIcon from '../../../Assets/Superadmin/delete.svg'
import Api from '../../../Services/Api';
import { ClipLoader } from 'react-spinners';


const token = localStorage.getItem('token')

function ProjectListComponent() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [clientName, setClientName] = useState('');
  const [projectType, setProjectType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [deleteId, setDeleteId] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false)

  const handleCreateClick = () => {
    setShowModal(!showModal)
  }

  const handleCancelClick = () => {
    setShowModal(false)
  }

  const handleSubmit = () => {
    Api.post('api/project', {
      "projectName": projectName,
      "projectDescription": projectDescription,
      "client": clientName,
      "projectType": projectType,
      "startDate": startDate,
      "endDate": endDate
    }, {
      'Authorization': `Bearer ${token}`
    })
      .then(response => {
        if (response && response.data) {
          console.log('new project added', response)
          setRefreshKey(prev => prev + 1);
          setProjectName('');
          setProjectDescription('');
          setClientName('');
          setProjectType('');
          setStartDate('');
          setEndDate('');
          setShowModal(false);
        } else {
          console.error('Error adding project', response)
        }
      })
  }

  const handleDeleteClick = (id) => {
    console.log(id)
    setDeleteId(id);
    setDeleteModal(true)
  }

  const handleDeleteModalCancel =()=> {
    setDeleteModal(false);
  }

  const handleDeleteModalConfirm =()=> {
    setIsDeleting(true);
    Api.delete(`api/project/${deleteId}`, {
      'Authorization': `Bearer ${token}`
    })
    .then(response => {
      setIsDeleting(false)
      if(response && response.data) {
        console.log(response.data.message);
        setRefreshKey(prev=>prev+1);
        setDeleteModal(false)
      } else {
        console.error('Invalid response data', response);
        alert('Can not delete project. Please try again.')
      }
    })
  }

  useEffect(() => {
    Api.get('api/project', {
      'Authorization': `Bearer ${token}`
    })
      .then(response => {
        if (response && response.data) {
          console.log('projects response', response.data.content)
          setProjects(response.data.content)
        } else {
          console.error('Error fetching projects', response)
        }

      })
  }, [refreshKey])
  return (
    <div className='px-4'>
      <div className='flex items-center justify-between'>
        <div className="text-[20px] text-[#232E42] font-medium">
          All projects list
        </div>
        <div>
          <button
            onClick={handleCreateClick}
            className="bg-[#2B2342] flex items-center ml-6 font-normal text-sm mt-[24px] text-white px-6 py-[14px] rounded-lg"
          >
            <img src={addIcon} className="mr-[8px]" alt="Add icon" />
            Create Project
          </button>
        </div>
      </div>

      <div className='mt-10 '>
        <div className='overflow-x-auto bg-white rounded-t-lg '>
          <table className='w-full border-none '>
            <thead className='bg-[#465062] h-[50px] text-white'>
              <tr className='bg-[#465062] h-[48px] text-white text-[16px]'>
                <th className='p-4 text-left font-normal text-sm' scope="col">Project Name</th>
                <th className='p-4 text-left font-normal text-sm' scope="col">Start Date</th>
                <th className='p-4 text-left font-normal text-sm' scope="col">End Date</th>
                <th className='p-4 text-left font-normal text-sm' scope="col">Client's Name</th>
                <th className='p-4 text-left font-normal text-sm' scope="col">Project Type</th>
                <th className='p-4 text-left font-normal text-sm' scope="col">Status</th>
                <th className='p-4 text-left font-normal text-sm' scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={index} className='border-b  hover:bg-[#F9F9F9] text-[#373737] font-light'>
                  <td className='p-4 text-left text-sm'>{project.projectName}</td>
                  <td className='p-4 text-left text-sm'>{project.startDate}</td>
                  <td className='p-4 text-left text-sm'>{project.endDate}</td>
                  <td className='p-4 text-left text-sm'>{project.clientName}</td>
                  <td className='p-4 text-left text-sm'>{project.projectType}</td>
                  <td className='p-4 text-left text-sm'>{project.status}</td>
                  <td className='p-4 text-left text-sm'>
                    <img src={deleteIcon} onClick={() => handleDeleteClick(project.id)}></img>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
                <div className='text-[18px] text-[#373737]'>Are you sure to delete this Project ?</div>
                <div className='flex gap-4 mt-8 w-fit ml-auto'>
                  <button className='bg-[#405170] hover:bg-[#232E42] w-[72px] h-[42px] text-white font-light rounded-[8px]' onClick={handleDeleteModalCancel}>Cancel</button>
                  <button className='bg-[#405170] hover:bg-[#232E42] w-[72px] h-[42px] text-white font-light rounded-[8px]' onClick={handleDeleteModalConfirm}>Delete</button>
                </div>
              </div>
            }
          </div>
        </div>
      )}


      {showModal && (
        <div className="fixed inset-0 bg-neutral-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-auto  p-10  shadow-lg">
            <div className='flex items-center justify-between'>
              <div className='text-[18px] text-[#373737]'>Add new Project</div>
              <img
                onClick={handleCancelClick}
                src={CloseBtn} alt="" />
            </div>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter Project Name"
              className="border px-6 py-2 w-full mt-6 h-[40px] placeholder:mt-2"
            />

            <input
              type="text"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Enter Project Description"
              className="border px-6 py-2 w-full mt-6 h-[68px] placeholder:mt-2"
            />

            <div className='flex gap-2'>
              <div>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Enter Client's name"
                  className="border px-6 py-2 w-full mt-6 h-[40px] placeholder:mt-2"
                />
              </div>
              <div>
                <select
                  type="text"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  placeholder="Enter Project type"
                  className="border px-6 py-2 w-full mt-6 h-[40px] placeholder:mt-2"
                >
                  <option value="">Project Type</option>
                  <option value="In house">In house</option>
                  <option value="Service">Service</option>
                </select>
              </div>
            </div>

            <div className='flex gap-2'>
              <div>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="Enter start date"
                  className="border px-6 py-2 w-full mt-6 h-[40px] placeholder:mt-2"
                />
              </div>
              <div>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="Enter end date"
                  className="border px-6 py-2 w-full mt-6 h-[40px] placeholder:mt-2"
                />
              </div>
            </div>


            <div className='flex gap-4 mt-8 w-fit ml-auto'>
              <button className='bg-[#405170] hover:bg-[#232E42] w-[72px] h-[42px] text-white font-light rounded-[8px]' onClick={handleCancelClick}>Cancel</button>
              <button className='bg-[#405170] hover:bg-[#232E42] w-[72px] h-[42px] text-white font-light rounded-[8px]' onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default ProjectListComponent
