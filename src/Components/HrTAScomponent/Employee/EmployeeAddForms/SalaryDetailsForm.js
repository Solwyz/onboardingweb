import React, { useEffect, useState } from 'react'
import tickIcon from '../../../../Assets/HrTas/check.svg';
import PersonalDetailForm from './PersonalDetailForm';
import BackButton from './BackButton';

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

          <div className='flex justify-center mt-[32px]'>
            <ol className="flex items-center w-[678px]">
              {/* Step 1 */}
              <li className="flex flex-col items-start  w-full text-center">
                <div className="flex w-full items-center text-[#2B2342] after:content-[''] after:w-full after:h-1 after:border-b-[1px] after:border-[#2B2342] after:inline-block">
                  <span className="flex items-center justify-center w-5 h-5 bg-[#2B2342] rounded-full shrink-0">
                    <img src={tickIcon} alt="" className="w-3 h-3" />
                  </span>
                </div>
                <span className="mt-2 text-sm font-normal  text-[#2B2342] ml-[-5px]">Basic</span> {/* Text directly below the circle */}
              </li>

              {/* Step 2 */}
              <li className="flex flex-col  items-start w-full text-center">
                <div className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b-[1px] after:border-[#2B2342] after:inline-block">
                  <span className="flex items-center justify-center w-5 h-5 bg-[#2B2342] rounded-full shrink-0">
                    <img src={tickIcon} alt="" className="w-3 h-3" />
                  </span>
                </div>
                <span className="mt-2 text-sm font-normal text-[#2B2342] ml-[-20px]">Professional</span> {/* Text directly below the circle */}
              </li>

              {/* Step 3 */}
              <li className="flex flex-col items-start w-full text-center">
                <div className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b-[1px] after:border-[#C2C2C2] after:inline-block">
                  <span className="flex items-center justify-center w-5 h-5 bg-[#2B2342] rounded-full shrink-0">
                    <img src={tickIcon} alt="" className="w-3 h-3" />
                  </span>
                </div>
                <span className="mt-2 text-sm font-normal text-[#696A70] ml-[-5px]">Salary</span> {/* Text directly below the circle */}
              </li>

              {/* Step 4 */}
              <li className="flex flex-col items-start w-full text-center">
                <div className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b-[1px] after:border-[#C2C2C2] after:inline-block">
                  <span className="flex items-center justify-center w-5 h-5 bg-[#DCDCDC] rounded-full shrink-0">
                    {/* No tick icon for this step */}
                  </span>
                </div>
                <span className="mt-2 text-sm font-normal text-[#696A70] ml-[-5px]">Personal</span> {/* Text directly below the circle */}
              </li>

              {/* Step 5 */}
              <li className="flex flex-col items-start w-full text-center">
                <div className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b-[1px] after:border-[#C2C2C2] after:inline-block">
                  <span className="flex items-center justify-center w-5 h-5 bg-[#DCDCDC] rounded-full shrink-0">
                    {/* No tick icon for this step */}
                  </span>
                </div>
                <span className="mt-2 text-sm font-normal text-[#696A70] ml-[-5px]">Contact</span> {/* Text directly below the circle */}
              </li>

              {/* Step 6 */}
              <li className="flex flex-col items-start w-full text-center">
                <div className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b-[1px] after:border-[#C2C2C2] after:inline-block">
                  <span className="flex items-center justify-center w-5 h-5 bg-[#DCDCDC] rounded-full shrink-0">
                    {/* No tick icon for this step */}
                  </span>
                </div>
                <span className="mt-2 text-sm font-normal text-[#696A70] ml-[-5px]">Physical</span> {/* Text directly below the circle */}
              </li>

              {/* Final Step */}
              <li className="flex flex-col items-start w-full text-center">
                <div className="flex items-center w-full">
                  <span className="flex items-center justify-center w-5 h-5 bg-[#DCDCDC] rounded-full shrink-0">
                    {/* No tick icon for this step */}
                  </span>
                </div>
                <span className="mt-2 text-sm  font-normal text-[#696A70]">Final</span> {/* Text directly below the circle */}
              </li>
            </ol>
          </div>

          <div className='flex justify-end mt-6'>
            <BackButton stateValue={setShowSalaryForm}/>
          </div>

          <div className='p-6'>
            <form className='border rounded shadow mt-8 p-6 bg-white pb-32' onSubmit={handleSubmit}>
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
                    <option value='Check'>Check</option>
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
