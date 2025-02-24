import React from 'react'

function ProffesionalDetails({ employeeDetails }) {
    return (
        <div>

            <table>
                <tbody>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Date of joining :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{new Date(employeeDetails.dateOfJoin).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        })}</td>

                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>End of probation :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{new Date(employeeDetails.endOfProbation).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        })}</td>
                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Date effective :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{new Date(employeeDetails.dateEffective).toLocaleDateString('en-GB',{
                            day:'2-digit',
                            month:'2-digit',
                            year:'numeric',
                        })}</td>
                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Job Position :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.jobPosition}</td>
                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Line Manager :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.lineManager}</td>
                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Department :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.department}</td>
                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Branch :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.branch}</td>
                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Level :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.level}</td>
                    </tr>
                </tbody>
            </table>

            <div className='text-[20px] font-medium border-b pb-4 mt-10'>Employement Terms</div>

            <table className='mt-4'>
                <tbody>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Date effective :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{new Date(employeeDetails.dateEffective).toLocaleDateString('en-GB',{
                            day:'2-digit',
                            month:'2-digit',
                            year:'numeric'
                        })}</td>
                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Job Type :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.jobType}</td>
                    </tr>
                    {/* <tr>
                        <td className='font-medium text-[#373737] py-1'>Description :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.description}</td>
                    </tr> */}
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Leave flow :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.leaveFlow}</td>
                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Workday :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.workday}</td>
                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Holiday :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.holiday}</td>
                    </tr>
                </tbody>
            </table>


        </div>
    )
}

export default ProffesionalDetails
