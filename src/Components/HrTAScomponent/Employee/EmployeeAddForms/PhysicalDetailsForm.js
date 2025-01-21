import React, { useState } from 'react';
import tickIcon from '../../../../Assets/HrTas/check.svg';
import FinalDetailsForm from './FinalDetailsForm';
import BackButton from './BackButton';
import NewProgressive from './NewProgressive';
import Api from '../../../../Services/Api';

const token = localStorage.getItem("token")
console.log("token:", token)

function PhysicalDetailsForm({ setShowPhysicalForm }) {

    const [showFinalForm, setShowFinalForm] = useState(false)
    const [formData, setFormData] = useState({
        height: '',
        weight: '',
        bloodType: '',
        visionLeft: '',
        visionRight: '',
        hearingLeft: '',
        hearingRight: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Validate form: check if all fields are filled
    const isFormValid = Object.values(formData).every(field => field.trim() !== '');

    const handleNext = () => {
        if (isFormValid) {
            console.log("Proceed to the next step");
            console.log(formData)
            setShowFinalForm(true)
            Api.post('api/physical', {

                "height": formData.height,
                "weight": formData.weight,
                "leftVision": formData.visionLeft,
                "rightVision": formData.visionRight,
                "leftHearing": formData.hearingLeft,
                "rightHearing": formData.hearingRight,
                "bloodType": formData.bloodType



            },
                {
                    'Authorization': `Bearer ${token}`
                })
                .then(response => {
                    console.log('physical:', response)
                })
        }
    };

    return (
        <div>
            {!showFinalForm ?
                <div className='bg-[#F8FAFB] pl-6 pr-12'>

                    <NewProgressive stage={"Physical"} />

                    <div className='flex justify-start mt-6'>
                        <BackButton stateValue={setShowPhysicalForm} />
                    </div>

                    <div className='Details-form bg-white mt-8 p-6'>
                        <div>
                            <h1 className='text-[20px] font-medium'>Physical</h1>
                            <div className='border w-full mt-4'></div>
                            <div className='flex mt-[16px]'>
                                <div>
                                    <label className="block text-sm text-[#373737] font-normal">Height(cm)</label>
                                    <input
                                        type="text"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleChange}
                                        className="w-[247px] h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] focus:outline-none font-normal"
                                    />
                                </div>

                                <div className='ml-[16px]'>
                                    <label className="block text-sm font-normal text-[#373737]">Weight(Kg)</label>
                                    <input
                                        type="text"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        className="w-[247px] focus:outline-none h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal"
                                    />
                                </div>
                            </div>

                            <div className='mt-4'>
                                <label className="block text-sm font-normal text-[#373737]">Blood type</label>
                                <input
                                    type="text"
                                    name="bloodType"
                                    value={formData.bloodType}
                                    onChange={handleChange}
                                    className="w-[247px] focus:outline-none h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal"
                                />
                            </div>
                        </div>

                        {/* Vision Section */}
                        <div>
                            <h1 className='text-[20px] font-medium mt-8'>Vision</h1>
                            <div className='border w-full mt-4'></div>
                            <div className='flex mt-[16px]'>
                                <div>
                                    <label className="block text-sm text-[#373737] font-normal">Left</label>
                                    <input
                                        type="text"
                                        name="visionLeft"
                                        value={formData.visionLeft}
                                        onChange={handleChange}
                                        className="w-[247px] h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] focus:outline-none font-normal"
                                    />
                                </div>

                                <div className='ml-[16px]'>
                                    <label className="block text-sm font-normal text-[#373737]">Right</label>
                                    <input
                                        type="text"
                                        name="visionRight"
                                        value={formData.visionRight}
                                        onChange={handleChange}
                                        className="w-[247px] focus:outline-none h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Hearing Section */}
                        <div>
                            <h1 className='text-[20px] font-medium mt-8'>Hearing</h1>
                            <div className='border w-full mt-4'></div>
                            <div className='flex mt-[16px]'>
                                <div>
                                    <label className="block text-sm text-[#373737] font-normal">Left</label>
                                    <input
                                        type="text"
                                        name="hearingLeft"
                                        value={formData.hearingLeft}
                                        onChange={handleChange}
                                        className="w-[247px] h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] focus:outline-none font-normal"
                                    />
                                </div>

                                <div className='ml-[16px]'>
                                    <label className="block text-sm font-normal text-[#373737]">Right</label>
                                    <input
                                        type="text"
                                        name="hearingRight"
                                        value={formData.hearingRight}
                                        onChange={handleChange}
                                        className="w-[247px] focus:outline-none h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal"
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
                </div> : <FinalDetailsForm setShowFinalForm={setShowFinalForm} showFinalForm={showFinalForm} />
            }
        </div>
    );
}

export default PhysicalDetailsForm;
