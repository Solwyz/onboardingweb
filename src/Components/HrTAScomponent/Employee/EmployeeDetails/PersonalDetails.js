import React from 'react'

function PersonalDetails({ employeeDetails }) {
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Martial Status :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.martialStatus}</td>
                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Father Name :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.fatherName}</td>
                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Spouse Name :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.spouseName}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default PersonalDetails
