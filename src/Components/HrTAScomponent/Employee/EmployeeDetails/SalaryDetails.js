import React from 'react'

function SalaryDetails({ employeeDetails }) {
  return (
    <div>

            <table>
                <tbody>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Basic Salary :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.basicSalary}</td>
                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Current Salary :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.currentSalary}</td>
                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Next Review Date :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.nextReviewDate}</td>
                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Earning :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.earning}</td>
                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Deduction :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.deduction}</td>
                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Bonus :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.bonus}</td>
                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>EPF :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.epf}</td>
                    </tr>
                </tbody>
            </table>

            <div className='text-[20px] font-medium border-b pb-4 mt-10'>Payment</div>

            <table className='mt-4'>
                <tbody>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Bank Name :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.bankName}</td>
                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Bank Account :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.bankAccount}</td>
                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Pay Period :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.payPeriod}</td>
                    </tr>
                    <tr>
                        <td className='font-medium text-[#373737] py-1'>Method :</td>
                        <td className='w-12'></td>
                        <td className='text-[#696A70]'>{employeeDetails.method}</td>
                    </tr>
                </tbody>
            </table>


        </div>
  )
}

export default SalaryDetails
