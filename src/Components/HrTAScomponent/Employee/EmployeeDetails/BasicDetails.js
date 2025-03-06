import React from 'react'

function BasicDetails({ employeeDetails }) {
  return (
    <div>

      <table>
        <tbody>
          <tr>
            <td className='font-medium text-[#373737] py-1'>First Name :</td>
            <td className='w-12'></td>
            <td className='text-[#696A70]'>{employeeDetails.firstName}</td>
          </tr>
          <tr>
            <td className='font-medium text-[#373737] py-1'>Last Name :</td>
            <td className='w-12'></td>
            <td className='text-[#696A70]'>{employeeDetails.lastName}</td>
          </tr>
          <tr>
            <td className='font-medium text-[#373737] py-1'>Nationality :</td>
            <td className='w-12'></td>
            <td className='text-[#696A70]'>{employeeDetails.nationality}</td>
          </tr>
          <tr>
            <td className="font-medium text-[#373737] py-1">Date of Birth :</td>
            <td className="w-12"></td>
            <td className="text-[#696A70]">
              {new Date(employeeDetails.dateOfBirth).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </td>
          </tr>
        </tbody>
      </table>

      <div className='text-[20px] font-medium border-b pb-4 mt-10'>ID Proof</div>

      <table className='mt-4'>
        <tbody>
          <tr>
            <td className='font-medium text-[#373737] py-1'>PAN :</td>
            <td className='w-12'></td>
            <td className='text-[#696A70]'>{employeeDetails.panNumber}</td>
          </tr>
          <tr>
            <td className='font-medium text-[#373737] py-1'>Passport :</td>
            <td className='w-12'></td>
            <td className='text-[#696A70]'>{employeeDetails.passport}</td>
          </tr>
        </tbody>
      </table>


      <div className='text-[20px] font-medium border-b pb-4 mt-10'>Job</div>

      <table className='mt-4'>
        <tbody>
          <tr>
            <td className='font-medium text-[#373737] py-1'>Designation :</td>
            <td className='w-12'></td>
            <td className='text-[#696A70]'>{employeeDetails.designation}</td>
          </tr>
          <tr>
            <td className='font-medium text-[#373737] py-1'>Department :</td>
            <td className='w-12'></td>
            <td className='text-[#696A70]'>{employeeDetails.department}</td>
          </tr>
          <tr>
            <td className='font-medium text-[#373737] py-1'>Email :</td>
            <td className='w-12'></td>
            <td className='text-[#696A70]'>{employeeDetails.email}</td>
          </tr>
        </tbody>
      </table>

    </div>
  )
}

export default BasicDetails
