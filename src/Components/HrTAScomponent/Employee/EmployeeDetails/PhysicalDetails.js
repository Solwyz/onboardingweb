import React from 'react'

function PhysicalDetails({ employeeDetails }) {
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Height(cm) :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.height}</td>
                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Weight(kg) :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.weight}</td>
                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Blood Type :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.bloodType}</td>
                    </tr>
                </tbody>
            </table>

            <div className='text-[20px] font-medium border-b pb-4 mt-10'>Vision</div>

            <table className='mt-4'>
                <tbody>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Left :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.visionLeft}</td>
                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Right :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.visionRight}</td>
                    </tr>
                </tbody>
            </table>

            <div className='text-[20px] font-medium border-b pb-4 mt-10'>Hearing</div>

            <table className='mt-4'>
                <tbody>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Left :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.hearingLeft}</td>
                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Right :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.hearingRight}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default PhysicalDetails
