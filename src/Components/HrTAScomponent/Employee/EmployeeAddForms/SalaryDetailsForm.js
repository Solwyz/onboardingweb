import React, { useEffect, useState } from 'react'
import tickIcon from '../../../../Assets/HrTas/check.svg';
import PersonalDetailForm from './PersonalDetailForm';
import BackButton from './BackButton';
import NewProgressive from './NewProgressive';

function SalaryDetailsForm({setShowSalaryForm}) {

  const [isFormValid, setIsFormValid] = useState(false)
  const [showPersonalForm, setShowPersonalForm] = useState(false)
  const [formData, setFormData] = useState({
    basicSalary: '',
    currentSalary: '',
    nextReviewDate: '',
    earning: '',
    deduction: '',
    bonus: '',
    epf: '',
    bankName: '',
    bankAccount: '',
    payPeriod: 'Monthly',
    method: 'Net Banking'
  })

  useEffect(() => {
    const { basicSalary,
      currentSalary,
      nextReviewDate,
      earning,
      deduction,
      bonus,
      epf,
      bankName,
      bankAccount,
      payPeriod,
      method } = formData

    const isValid = basicSalary &&
      currentSalary &&
      nextReviewDate &&
      earning &&
      deduction &&
      bonus &&
      epf &&
      bankName &&
      bankAccount &&
      payPeriod &&
      method;

    setIsFormValid(isValid);
  }, [formData])

  const handleKeyDown = (e) => {
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
      e.preventDefault();
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      console.log(formData)
      setShowPersonalForm(true)
    }
  }

  const today = new Date().toISOString().split("T")[0];


  return (
    <div>
      {!showPersonalForm ?
        <div className='mt-8'>

          <NewProgressive stage={"Salary"}/>

          <div className='flex justify-start mt-6 mx-6'>
            <BackButton stateValue={setShowSalaryForm}/>
          </div>

          <div className='p-6'>
            <form className='border rounded shadow p-6 bg-white pb-32' onSubmit={handleSubmit}>
              <div className='text-[20px] font-medium border-b pb-4'>Salary Details</div>

              <div className='flex gap-4 text-[#373737]'>
                <div className='mt-6'>
                  <div className='text-[14px]'>Basic Salary</div>
                  <input
                    type='text'
                    name='basicSalary'
                    onKeyDown={handleKeyDown}
                    value={formData.basicSalary}
                    onChange={handleFormChange}
                    className='text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] text-[#696A70] focus:outline-[#A4A4E5]'
                  />
                </div>
                <div className='mt-6'>
                  <div className='text-[14px]'>Current Salary</div>
                  <input
                    type='text'
                    name='currentSalary'
                    onKeyDown={handleKeyDown}
                    value={formData.currentSalary}
                    onChange={handleFormChange}
                    className='text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] text-[#696A70] focus:outline-[#A4A4E5]'
                  />
                </div>
              </div>

              <div className='flex gap-4 text-[#373737]'>
                <div className='mt-6'>
                  <div className='text-[14px]'>Next review date</div>
                  <input
                    type='date'
                    name='nextReviewDate'
                    min={today}
                    value={formData.nextReviewDate}
                    onChange={handleFormChange}
                    className='text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] text-[#696A70] focus:outline-[#A4A4E5]'
                  />
                </div>
              </div>

              <div className='flex gap-4 text-[#373737]'>
                <div className='mt-6'>
                  <div className='text-[14px]'>Earning</div>
                  <input
                    type='text'
                    name='earning'
                    onKeyDown={handleKeyDown}
                    value={formData.earning}
                    onChange={handleFormChange}
                    className='text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] text-[#696A70] focus:outline-[#A4A4E5]'
                  />
                </div>
                <div className='mt-6'>
                  <div className='text-[14px]'>Deduction</div>
                  <input
                    type='text'
                    name='deduction'
                    onKeyDown={handleKeyDown}
                    value={formData.deduction}
                    onChange={handleFormChange}
                    className='text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] text-[#696A70] focus:outline-[#A4A4E5]'
                  />
                </div>
                <div className='mt-6'>
                  <div className='text-[14px]'>Bonus</div>
                  <input
                    type='text'
                    name='bonus'
                    onKeyDown={handleKeyDown}
                    value={formData.bonus}
                    onChange={handleFormChange}
                    className='text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] text-[#696A70] focus:outline-[#A4A4E5]'
                  />
                </div>
                <div className='mt-6'>
                  <div className='text-[14px]'>EPF</div>
                  <input
                    type='text'
                    name='epf'
                    onKeyDown={handleKeyDown}
                    value={formData.epf}
                    onChange={handleFormChange}
                    className='text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] text-[#696A70] focus:outline-[#A4A4E5]'
                  />
                </div>
              </div>

              <div className='text-[20px] font-medium border-b pb-4 mt-8'>Payment</div>

              <div className='flex gap-4 text-[#373737]'>
                <div className='mt-6'>
                  <div className='text-[14px]'>Bank Name</div>
                  <input
                    type='text'
                    name='bankName'
                    value={formData.bankName}
                    onChange={handleFormChange}
                    className='text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] text-[#696A70] focus:outline-[#A4A4E5]'
                  />
                </div>
                <div className='mt-6'>
                  <div className='text-[14px]'>Bank Account</div>
                  <input
                    type='text'
                    name='bankAccount'
                    onKeyDown={handleKeyDown}
                    value={formData.bankAccount}
                    onChange={handleFormChange}
                    className='text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] text-[#696A70] focus:outline-[#A4A4E5]'
                  />
                </div>
              </div>

              <div className='flex gap-4 text-[#373737]'>
                <div className='mt-6'>
                  <div className='text-[14px]'>Pay Period</div>
                  <select
                    name='payPeriod'
                    value={formData.payPeriod}
                    onChange={handleFormChange}
                    className='text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] text-[#696A70] focus:outline-[#A4A4E5]'
                  >
                    <option value='Monthly'>Monthly</option>
                    <option value='Yearly'>Yearly</option>
                  </select>
                </div>
                <div className='mt-6'>
                  <div className='text-[14px]'>Method</div>
                  <select
                    name='method'
                    value={formData.method}
                    onChange={handleFormChange}
                    className='text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] text-[#696A70] focus:outline-[#A4A4E5]'
                  >
                    <option value='Net Banking'>Net Banking</option>
                    <option value='Cheque'>Cheque</option>
                  </select>
                </div>
              </div>

              <div className='flex justify-end'>
                <button
                  type='submit'
                  className={`text-[14px] text-white bg-[#2B2342] rounded px-8 py-4 mt-8 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!isFormValid}
                >
                  Next
                </button>
              </div>

            </form>
          </div>

        </div> : <PersonalDetailForm setShowPersonalForm={setShowPersonalForm}/>
      }
    </div>
  )
}

export default SalaryDetailsForm
