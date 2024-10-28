import React, { useState } from 'react';
import tickIcon from '../../../../Assets/HrTas/check.svg';
import DropDownArrow from "../../../../Assets/HrTas/drop-down-arrow.svg";
import ContactDetailsForm from './ContactDetailsForm';

function PersonalDetailForm() {
    const [showContactForm, setShowContactForm] = useState(false)
    const [maritalStatus, setMaritalStatus] = useState('single'); // To manage marital status
    const [fatherName, setFatherName] = useState('');
    const [spouseName, setSpouseName] = useState('');
    const [isFormValid, setIsFormValid] = useState(false); // To manage the form validation
    const [showDropdown, setShowDropdown] = useState(false); // To toggle dropdown visibility

    // Handle marital status change
    const handleMaritalStatusChange = (status) => {
        setMaritalStatus(status);
        setShowDropdown(false);

        // Reset values based on selection
        if (status === 'single') {
            setSpouseName(''); // Clear spouse name if "single"
        } else {
            setFatherName(''); // Clear father name if "married"
        }
        handleFormValidation(); // Trigger validation after change
    };

    // Handle form validation logic
    const handleFormValidation = () => {
        if (
            (maritalStatus === 'single' && fatherName.trim().length > 0) ||
            (maritalStatus === 'married' && spouseName.trim().length > 0)
        ) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    // Handle Next button click
    const handleNext = () => {
        if (isFormValid) {
            // Perform action on form submit
            console.log('Form submitted');
            setShowContactForm(true)
        }
    };

    return (
        <div>
        {!showContactForm ? 
        <div className='bg-[#F8FAFB] pl-6 pr-12'>
            <div className='flex justify-center mt-[32px]'>
                <ol className="flex items-center w-[678px]">
                    {/* Step 1 */}
                    <li className="flex flex-col items-start w-full text-center">
                        <div className="flex w-full items-center text-[#2B2342] after:content-[''] after:w-full after:h-1 after:border-b-[1px] after:border-[#2B2342] after:inline-block">
                            <span className="flex items-center justify-center w-5 h-5 bg-[#2B2342] rounded-full shrink-0">
                                <img src={tickIcon} alt="" className="w-3 h-3" />
                            </span>
                        </div>
                        <span className="mt-2 text-sm font-normal text-[#2B2342] ml-[-5px]">Basic</span>
                    </li>

                    {/* Step 2 */}
                    <li className="flex flex-col items-start w-full text-center">
                        <div className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b-[1px] after:border-[#2B2342] after:inline-block">
                            <span className="flex items-center justify-center w-5 h-5 bg-[#2B2342] rounded-full shrink-0">
                                <img src={tickIcon} alt="" className="w-3 h-3" />
                            </span>
                        </div>
                        <span className="mt-2 text-sm font-normal text-[#2B2342] ml-[-20px]">Professional</span>
                    </li>

                    {/* Step 3 */}
                    <li className="flex flex-col items-start w-full text-center">
                        <div className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b-[1px] after:border-[#2B2342] after:inline-block">
                            <span className="flex items-center justify-center w-5 h-5 bg-[#2B2342] rounded-full shrink-0">
                                <img src={tickIcon} alt="" className="w-3 h-3" />
                            </span>
                        </div>
                        <span className="mt-2 text-sm font-normal text-[#696A70] ml-[-5px]">Salary</span>
                    </li>

                    {/* Step 4 */}
                    <li className="flex flex-col items-start w-full text-center">
                        <div className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b-[1px] after:border-[#C2C2C2] after:inline-block">
                            <span className="flex items-center justify-center w-5 h-5 bg-[#2B2342] rounded-full shrink-0">
                                <img src={tickIcon} alt="" className="w-3 h-3" />
                            </span>
                        </div>
                        <span className="mt-2 text-sm font-normal text-[#696A70] ml-[-5px]">Personal</span>
                    </li>

                    {/* Step 5 */}
                    <li className="flex flex-col items-start w-full text-center">
                        <div className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b-[1px] after:border-[#C2C2C2] after:inline-block">
                            <span className="flex items-center justify-center w-5 h-5 bg-[#DCDCDC] rounded-full shrink-0">
                                <img src={tickIcon} alt="" className="w-3 h-3" />
                            </span>
                        </div>
                        <span className="mt-2 text-sm font-normal text-[#696A70] ml-[-5px]">Contact</span>
                    </li>

                    {/* Step 6 */}
                    <li className="flex flex-col items-start w-full text-center">
                        <div className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b-[1px] after:border-[#C2C2C2] after:inline-block">
                            <span className="flex items-center justify-center w-5 h-5 bg-[#DCDCDC] rounded-full shrink-0">
                                <img src={tickIcon} alt="" className="w-3 h-3" />
                            </span>
                        </div>
                        <span className="mt-2 text-sm font-normal text-[#696A70] ml-[-5px]">Physical</span>
                    </li>

                    {/* Final Step */}
                    <li className="flex flex-col items-start w-full text-center">
                        <div className="flex items-center w-full">
                            <span className="flex items-center justify-center w-5 h-5 bg-[#DCDCDC] rounded-full shrink-0">
                                {/* No tick icon for this step */}
                            </span>
                        </div>
                        <span className="mt-2 text-sm font-normal text-[#696A70]">Final</span>
                    </li>
                </ol>
            </div>


            <div className='Details-form bg-white mt-8 p-6'>
                <div>
                    <h1 className='text-[20px] font-medium'>Personal</h1>
                    <div className='border w-full mt-4'></div>

                    {/* Marital Status Dropdown */}
                    <div className='flex mt-[16px]'>
                        <div>
                            <div className="block text-sm text-[#373737] font-normal">Marital Status</div>
                            <div
                                className="w-[247px] h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal flex items-center justify-between cursor-pointer"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                {maritalStatus} <img className='' src={DropDownArrow} alt="" />
                            </div>
                            {showDropdown && (
                                <div className="mt-2 w-[247px] border border-[#E6E6E7] rounded-[8px]">
                                    <div
                                        className="p-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleMaritalStatusChange('single')}
                                    >
                                        Single
                                    </div>
                                    <div
                                        className="p-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleMaritalStatusChange('married')}
                                    >
                                        Married
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='flex'>
                        {/* Father Name input */}
                        <div className={`block mt-4 text-sm font-normal ${maritalStatus === 'married' ? 'text-gray-400 hidden' : 'text-[#373737]'}`}>
                            <div className="">
                                Father Name
                            </div>
                            <input
                                type="text"
                                name="fatherName"
                                value={fatherName}
                                onChange={(e) => {
                                    setFatherName(e.target.value);
                                    handleFormValidation();
                                }}
                                className={`w-[247px] focus:outline-none h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] font-normal ${maritalStatus === 'married' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-[#696A70]'
                                    }`}
                                disabled={maritalStatus === 'married'}
                            />
                        </div>

                        {/* Spouse Name input */}
                        <div className= {`block mt-4 text-sm font-normal ${maritalStatus === 'single' ? 'hidden ' : 'text-[#373737]'}`}>
                            <div className=''>
                                Spouse Name
                            </div>
                            <input
                                type="text"
                                name="spouseName"
                                value={spouseName}
                                onChange={(e) => {
                                    setSpouseName(e.target.value);
                                    handleFormValidation();
                                }}
                                className={`w-[247px] focus:outline-none h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] font-normal ${maritalStatus === 'single' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-[#696A70]'
                                    }`}
                                disabled={maritalStatus === 'single'}
                            />
                        </div>
                    </div>

                </div>

              
                <div className="flex justify-end mt-[32px]">
                    <button
                        className={`px-6 py-2 w-[92px] h-[48px] text-white font-normal text-sm rounded-md 
                        ${isFormValid ? 'bg-[#2B2342]' : 'bg-gray-400 cursor-not-allowed'}`}
                        onClick={handleNext}
                        disabled={!isFormValid}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div> : <ContactDetailsForm/>
        }
        </div>
    );
}

export default PersonalDetailForm;
