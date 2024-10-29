import React from 'react'

function ContactDetails({ employeeDetails }) {
    return (
        <div>
        <table>
            <tbody>
                <tr>
                    <td className='font-medium text-[#373737] py-1'>Primary Mobile Number :</td>
                    <td className='w-12'></td>
                    <td className='text-[#696A70]'>{employeeDetails.primaryMobile}</td>
                </tr>
                <tr>
                    <td className='font-medium text-[#373737] py-1'>Secondary Mobile Number :</td>
                    <td className='w-12'></td>
                    <td className='text-[#696A70]'>{employeeDetails.secondaryMobile}</td>
                </tr>
                <tr>
                    <td className='font-medium text-[#373737] py-1 pt-8'>Primary Address :</td>
                    <td className='w-12'></td>
                    <td className='text-[#696A70] pt-8'>{employeeDetails.primaryAddress}</td>
                </tr>
                <tr>
                    <td className='font-medium text-[#373737] py-1'>PIN code :</td>
                    <td className='w-12'></td>
                    <td className='text-[#696A70]'>{employeeDetails.primaryPincode}</td>
                </tr>
                <tr>
                    <td className='font-medium text-[#373737] py-1'>City :</td>
                    <td className='w-12'></td>
                    <td className='text-[#696A70]'>{employeeDetails.primaryCity}</td>
                </tr>
                <tr>
                    <td className='font-medium text-[#373737] py-1'>State :</td>
                    <td className='w-12'></td>
                    <td className='text-[#696A70]'>{employeeDetails.primaryState}</td>
                </tr>
                <tr>
                    <td className='font-medium text-[#373737] py-1 pt-6'>Secondary Address :</td>
                    <td className='w-12'></td>
                    <td className='text-[#696A70] pt-6'>{employeeDetails.secondaryAddress}</td>
                </tr>
                <tr>
                    <td className='font-medium text-[#373737] py-1'>PIN code :</td>
                    <td className='w-12'></td>
                    <td className='text-[#696A70]'>{employeeDetails.secondaryPincode}</td>
                </tr>
                <tr>
                    <td className='font-medium text-[#373737] py-1'>City :</td>
                    <td className='w-12'></td>
                    <td className='text-[#696A70]'>{employeeDetails.secondaryCity}</td>
                </tr>
                <tr>
                    <td className='font-medium text-[#373737] py-1'>State :</td>
                    <td className='w-12'></td>
                    <td className='text-[#696A70]'>{employeeDetails.secondaryState}</td>
                </tr>
            </tbody>
        </table>

        <div className='text-[20px] font-medium border-b pb-4 mt-10'>Emergency</div>

        <table className='mt-4'>
            <tbody>
                <tr>
                    <td className='font-medium text-[#373737] py-1'>First Name :</td>
                    <td className='w-32'></td>
                    <td className='text-[#696A70]'>{employeeDetails.emergencyFirstName}</td>
                </tr>
                <tr>
                    <td className='font-medium text-[#373737] py-1'>Last Name :</td>
                    <td className='w-32'></td>
                    <td className='text-[#696A70]'>{employeeDetails.emergencyLastName}</td>
                </tr>
                <tr>
                    <td className='font-medium text-[#373737] py-1'>Relationship :</td>
                    <td className='w-32'></td>
                    <td className='text-[#696A70]'>{employeeDetails.emergencyRelationship}</td>
                </tr>
                <tr>
                    <td className='font-medium text-[#373737] py-1'>Contact :</td>
                    <td className='w-32'></td>
                    <td className='text-[#696A70]'>{employeeDetails.emergencyContactNumber}</td>
                </tr>
            </tbody>
        </table>

    </div>
    )
}

export default ContactDetails
