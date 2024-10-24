import React from 'react'
import Person from "../../../Assets/HrTas/person-black.svg"
import ChartComponent from './BarChartProgress'
import DonutChart from './CircleProgressChart'

function Recruitment() {
  return (
    <div className='bg-[#F8FAFB] pl-4 pt-4 pr-[34px] pb-[73px]'>
     <div className='bg-[#FFFFFF] w-full px-6 pb-[93px]  pt-10'>
     <div className=''>
     <h2 className='text-[20px] text-[#232E42] font-medium '>
     All employees
            </h2>
          </div>
      <div className='mt-8 flex columns-2 gap-4'>
      <div className='w-[496px] border-[2px] border-gray-100 p-6 text-[16px] font-medium text-[#373737]'>
      Open positions 
      <ChartComponent/>
      </div>
      <div className='w-[496px] border-[2px] border-gray-100 p-6 text-[16px] font-medium text-[#373737]'>
      Open positions 
      <DonutChart/>
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
        <h1 className='text-[16px] font-medium flex items-start justify-start'><img className='mr-2' src={Person} alt=""/> Interview</h1>
          <ul className='text-[14px] font-normal text-[#696A70] space-y-6 mt-6 px-8 pb-8'>
            <li>Candidate Ranking</li>
            <li>Compare Interview feedback</li>
            <li>Compare Candidate Assessments</li>
           
          </ul>
        </div>
        <div>
        <h1 className='text-[16px] font-medium flex items-start justify-start'><img className='mr-2' src={Person} alt=""/>  Compliance</h1>
          <ul className='text-[14px] font-normal text-[#696A70] space-y-6 mt-6 px-8 pb-8'>
            <li>Candidate Flow</li>
            <li>Candidate Flow Summary</li>
          
          </ul>
        </div>
      </div>
     </div>
    </div>
  )
}

export default Recruitment
