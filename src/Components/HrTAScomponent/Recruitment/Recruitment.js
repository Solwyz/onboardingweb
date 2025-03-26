import React, { useState } from 'react'
import Person from "../../../Assets/HrTas/person-black.svg"
import ChartComponent from './BarChartProgress'
import DonutChart from './CircleProgressChart'
import CloseBtn from "../../../Assets/HrTas/close.svg";

function Recruitment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    position: "",
    skills: "",
    expiryDate: "",
    status: ""
  })

  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log('formsssdata', formData);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleCreateClick = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      position: "",
      skills: "",
      expiryDate: "",
      status: ""
    })
  }

  return (
    <div className='bg-[#F8FAFB] pl-4 pt-4 pr-[34px] pb-[73px]'>
      <div className='bg-[#FFFFFF] w-full px-6 pb-[93px]  pt-10'>
        <div className='flex items-center justify-between'>
          <h2 className='text-[20px] text-[#232E42] font-medium '>
            All employees
          </h2>
          <div className='border-2 px-4 py-2 cursor-pointer' onClick={handleCreateClick}>Create position</div>
        </div>
        <div className='mt-8 flex columns-2 gap-4'>
          <div className='w-[496px] border-[2px] border-gray-100 p-6 text-[16px] font-medium text-[#373737]'>
            Open positions
            <ChartComponent />
          </div>
          <div className='w-[496px] border-[2px] border-gray-100 p-6 text-[16px] font-medium text-[#373737]'>
            Open positions
            <DonutChart />
          </div>
        </div>
        <div className='w-full border border-gray-100 py-[45px] mt-8 flex columns-3  justify-around'>
          <div>
            <h1 className='text-[16px] font-medium flex items-start justify-start'><img className='mr-2' src={Person} alt="" /> Candidate Pipeline</h1>
            <ul className='text-[14px] font-normal text-[#696A70] space-y-6 mt-6 px-8 pb-8'>
              <li>Create Candidate Pool</li>
              <li>View All Candidate Pool</li>
              <li>All Referals</li>
              <li>Endorsement Request Status</li>
            </ul>
          </div>
          <div>
            <h1 className='text-[16px] font-medium flex items-start justify-start'><img className='mr-2' src={Person} alt="" /> Interview</h1>
            <ul className='text-[14px] font-normal text-[#696A70] space-y-6 mt-6 px-8 pb-8'>
              <li>Candidate Ranking</li>
              <li>Compare Interview feedback</li>
              <li>Compare Candidate Assessments</li>

            </ul>
          </div>
          <div>
            <h1 className='text-[16px] font-medium flex items-start justify-start'><img className='mr-2' src={Person} alt="" />  Compliance</h1>
            <ul className='text-[14px] font-normal text-[#696A70] space-y-6 mt-6 px-8 pb-8'>
              <li>Candidate Flow</li>
              <li>Candidate Flow Summary</li>

            </ul>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-[57%] flex justify-center items-center">
            <div className="bg-white p-8 shadow-lg w-[834px] h-[524px]">
              <div className="flex items-center justify-between">
                <div className="text-[20px] font-medium text-[#6C55B2]">
                  Create a new position
                </div>
                <button onClick={closeModal} className="">
                  <img src={CloseBtn} alt="" />
                </button>
              </div>
              <form className="mt-8" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-normal text-[#373737]">
                    Position
                  </label>
                  <input
                    type="text"
                    name="position"
                    className="block w-[247px] h-[48px] border border-[#E6E6E7] rounded-[8px] text-sm font-normal text-[#696A70] mt-[8px] py-2 px-3 focus:outline-none"
                    value={formData.position}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-normal text-[#373737]">
                    Skills required
                  </label>
                  <textarea
                    name="skills"
                    className="block w-full h-[96px] border border-[#E6E6E7] text-sm font-normal text-[#696A70] rounded-[8px] mt-[8px] py-2 px-3 focus:outline-none"
                    value={formData.skills}
                    onChange={handleInputChange}
                  />
                </div>

                <div className='flex items-center gap-10'>

                  <div className="mb-4">
                    <label className="block text-sm font-normal text-[#373737]">
                      Expiry date
                    </label>
                    <input
                      type="date"
                      name="expiryDate"
                      className="block w-[247px] h-[48px] border border-[#E6E6E7] rounded-[8px] text-sm font-normal text-[#696A70] mt-[8px] py-2 px-3 focus:outline-none"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-normal text-[#373737]">
                      Status
                    </label>
                    <select
                      type="text"
                      name="status"
                      className="block w-[247px] h-[48px] border border-[#E6E6E7] rounded-[8px] text-sm font-normal text-[#696A70] mt-[8px] py-2 px-3 focus:outline-none"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>

                </div>

                <div className="flex justify-end mt-[24px] mr-[24px] mb-[24px] col-span-2">
                  <button
                    type="submit"
                    // disabled={!isFormValid}
                    className={`bg-[#232E42] w-[107px] h-[48px] text-white font-medium px-6 py-2 rounded-[8px]`}
                  >
                    Submit
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Recruitment
