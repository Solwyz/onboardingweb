import React, { useState } from 'react';

import tickIcon from '../../../../Assets/HrTas/check.svg';
import DropDownArrow from "../../../../Assets/HrTas/drop-down-arrow.svg";
import ContactDetailsForm from './ContactDetailsForm';
import BackButton from './BackButton';
import NewProgressive from './NewProgressive';
import Api from '../../../../Services/Api';



const token = localStorage.getItem('token')
console.log("token:", token)

function PersonalDetailForm({ setShowPersonalForm, ids, setIds }) {
    const [showContactForm, setShowContactForm] = useState(false);
    const [maritalStatus, setMaritalStatus] = useState('SINGLE'); // To manage marital status
    const [fatherName, setFatherName] = useState('');
    const [spouseName, setSpouseName] = useState('');
    const [isFormValid, setIsFormValid] = useState(false); // To manage the form validation
    const [showDropdown, setShowDropdown] = useState(false); // To toggle dropdown visibility
    const [loading, setLoading] = useState(false); // To manage loading state
    const [error, setError] = useState(null); // To handle errors
    const [responsePersonalID, setresponsePersonalID] = useState(null)
    // Handle marital status change
    const handleMaritalStatusChange = (status) => {
        setMaritalStatus(status);
        setShowDropdown(false);

        // Reset values based on selection
        if (status === 'SINGLE') {
            setSpouseName(''); // Clear spouse name if "single"
        } else {
            setFatherName(''); // Clear father name if "married"
        }
        handleFormValidation(); // Trigger validation after change
    };

    // Handle form validation logic
    const handleFormValidation = () => {
        if (
            (maritalStatus === 'SINGLE' && fatherName.trim().length > 0) ||
            (maritalStatus === 'MARRIED' && spouseName.trim().length > 0)
        ) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    // Handle API submission
    const handleNext = async () => {
        if (isFormValid) {
            setLoading(true);
            setError(null);
            const payload = {
                maritalStatus,

                fatherName: maritalStatus === 'SELECT' ? fatherName : null,
                fatherName: maritalStatus === 'SINGLE' ? fatherName : null,
                spouseName: maritalStatus === 'MARRIED' ? spouseName : null,
            };

            try {
                const response = await Api.post('api/personDetails', {
                    "maritalStatus": maritalStatus,
                    "fatherName": fatherName,
                    
                }, {
                    'Authorization': `Bearer ${token}`
                });
                console.log('Form submitted successfully:', response);
                setresponsePersonalID(response.data.td)
                setIds((prevIds) => ({ ...prevIds, ["PersonalId"]: response.data.id }));
                console.log('pmmmmm', ids)
                console.log("personal", response.data.id)

                setShowContactForm(true);
            } catch (err) {
                console.error('Error submitting the form:', err);
                setError('Failed to submit the form. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div>
            {!showContactForm ? (
                <div className='bg-[#F8FAFB] pl-6 pr-12'>

                    <NewProgressive stage={"Personal"} />

                    <div className='flex justify-start mt-6'>
                        <BackButton stateValue={setShowPersonalForm} />
                    </div>

                    <div className='Details-form bg-white min-h-[700px] mt-8 p-6'>
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
                                                onClick={() => handleMaritalStatusChange('SINGLE')}
                                            >
                                                Single
                                            </div>
                                            <div
                                                className="p-2 cursor-pointer hover:bg-gray-200"
                                                onClick={() => handleMaritalStatusChange('MARRIED')}
                                            >
                                                Married
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className='flex'>
                                {/* Father Name input */}
                                <div className={`block mt-4 text-sm font-normal ${maritalStatus === 'MARRIED' ? 'text-gray-400 hidden' : 'text-[#373737]'}`}>
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
                                        className={`w-[247px] focus:outline-none h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] font-normal ${maritalStatus === 'MARRIED' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-[#696A70]'
                                            }`}
                                        disabled={maritalStatus === 'MARRIED'}
                                    />
                                </div>

                                {/* Spouse Name input */}
                                <div className={`block mt-4 text-sm font-normal ${maritalStatus === 'SINGLE' ? 'hidden ' : 'text-[#373737]'}`}>
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
                                        className={`w-[247px] focus:outline-none h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] font-normal ${maritalStatus === 'SINGLE' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-[#696A70]'
                                            }`}
                                        disabled={maritalStatus === 'SINGLE'}
                                    />
                                </div>
                            </div>
                        </div>

                        {error && <p className="text-red-500 mt-4">{error}</p>}

                        <div className="flex justify-end mt-[32px]">
                            <button
                                className={`text-[14px] text-white bg-[#2B2342] text-center rounded-lg px-8 h-[48px] 
                                ${isFormValid && !loading ? 'bg-[#2B2342]' : 'bg-gray-400 cursor-not-allowed'}`}
                                onClick={handleNext}
                                disabled={!isFormValid || loading}
                            >
                                {loading ? 'Loading...' : 'Next'}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <ContactDetailsForm setShowContactForm={setShowContactForm}
                   ids={ids}
                   setIds={setIds}
                 />
            )}
        </div>
    );
}

export default PersonalDetailForm;
