import React, { useState } from 'react';
import tickIcon from '../../../../Assets/HrTas/check.svg';
import DropDownArrow from "../../../../Assets/HrTas/drop-down-arrow.svg";

function PersonalDetailForm() {
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
        handleFormValidation();
    };

    // Handle form validation logic
    const handleFormValidation = () => {
        if (
            (maritalStatus === 'single' && fatherName.trim()) ||
            (maritalStatus === 'married' && spouseName.trim())
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
        }
    };

    return (
        <div className='bg-[#F8FAFB] pl-6 pr-12'>
            {/* Progress bar (omitted for brevity) */}

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
                        <div className='mt-4'>
                            <div className={`block text-sm font-normal ${maritalStatus === 'married' ? 'text-gray-400' : 'text-[#373737]'}`}>
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
                                className={`w-[247px] focus:outline-none h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] font-normal ${
                                    maritalStatus === 'married' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-[#696A70]'
                                }`}
                                disabled={maritalStatus === 'married'}
                            />
                        </div>

                        {/* Spouse Name input */}
                        <div className='ml-[16px] mt-4'>
                            <div className={`block text-sm font-normal ${maritalStatus === 'single' ? 'text-gray-400' : 'text-[#373737]'}`}>
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
                                className={`w-[247px] focus:outline-none h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] font-normal ${
                                    maritalStatus === 'single' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-[#696A70]'
                                }`}
                                disabled={maritalStatus === 'single'}
                            />
                        </div>
                    </div>

                </div>

                {/* Next Button */}
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
        </div>
    );
}

export default PersonalDetailForm;