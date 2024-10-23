import React, { useState, useEffect } from 'react';
import tickIcon from '../../../../Assets/HrTas/check.svg';
import PhysicalDetailsForm from './PhysicalDetailsForm';

function ContactDetailsForm() {
    const [showPhysicalForm, setShowPhysicalForm] = useState(false)
    const [formData, setFormData] = useState({
        primaryMobile: '',
        secondaryMobile: '',
        primaryAddress: '',
        primaryPincode: '',
        primaryCity: '',
        primaryState: '',
        secondaryAddress: '',
        secondaryPincode: '',
        secondaryCity: '',
        secondaryState: '',
        emergencyFirstName: '',
        emergencyLastName: '',
        emergencyRelationship: '',
        emergencyContactNumber: '',
    });

    const [sameAsPrimary, setSameAsPrimary] = useState(false);
    const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);

    const handleCheckboxChange = () => {
        setSameAsPrimary(!sameAsPrimary);
    };

    useEffect(() => {
        if (sameAsPrimary) {
            // Copy primary address fields to secondary fields
            setFormData((prev) => ({
                ...prev,
                secondaryAddress: prev.primaryAddress,
                secondaryPincode: prev.primaryPincode,
                secondaryCity: prev.primaryCity,
                secondaryState: prev.primaryState,
            }));
        } else {
            // Clear secondary address fields
            setFormData((prev) => ({
                ...prev,
                secondaryAddress: '',
                secondaryPincode: '',
                secondaryCity: '',
                secondaryState: '',
            }));
        }
    }, [sameAsPrimary]);

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Allow only numbers for specific fields
        if (['primaryMobile', 'secondaryMobile', 'primaryPincode', 'secondaryPincode', 'emergencyContactNumber'].includes(name)) {
            if (!/^\d*$/.test(value)) return; // Only allow digits
        }

        // Allow only letters for specific fields
        if (['primaryCity', 'primaryState', 'secondaryCity', 'secondaryState', 'emergencyFirstName', 'emergencyLastName', 'emergencyRelationship'].includes(name)) {
            if (!/^[a-zA-Z\s]*$/.test(value)) return; // Only allow letters and spaces
        }

        setFormData((prev) => ({ ...prev, [name]: value }));

        // Enable the "Next" button if all required fields are filled
        const allFieldsFilled = Object.values({
            ...formData,
            [name]: value, // Update the current field in validation check
        }).every((field) => field.trim() !== '');

        setIsNextButtonEnabled(allFieldsFilled);
    };

    // Handle form submission
    const handleNextClick = () => {
        if (isNextButtonEnabled) {
            console.log('Form Data Submitted:', formData);
            setShowPhysicalForm(true)
  
        }
    };

    return (
        <div>
        {!showPhysicalForm ? 
            <div>
                <div className='flex justify-center'>
                    <ol className="flex items-center mt-[32px] w-[678px]">
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
                            <div className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b-[1px] after:border-[#C2C2C2] after:inline-block">
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
                                <span className="flex items-center justify-center w-5 h-5 bg-[#2B2342] rounded-full shrink-0">
                                    <img src={tickIcon} alt="" className="w-3 h-3" />
    
                                </span>
                            </div>
                            <span className="mt-2 text-sm font-normal text-[#696A70] ml-[-5px]">Personal</span> {/* Text directly below the circle */}
                        </li>
    
                        {/* Step 5 */}
                        <li className="flex flex-col items-start w-full text-center">
                            <div className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b-[1px] after:border-[#C2C2C2] after:inline-block">
                                <span className="flex items-center justify-center w-5 h-5 bg-[#2B2342] rounded-full shrink-0">
                                    <img src={tickIcon} alt="" className="w-3 h-3" />
    
                                </span>
                            </div>
                            <span className="mt-2 text-sm font-normal text-[#696A70] ml-[-5px]">Contact</span> {/* Text directly below the circle */}
                        </li>
    
                        {/* Step 6 */}
                        <li className="flex flex-col items-start w-full text-center">
                            <div className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b-[1px] after:border-[#C2C2C2] after:inline-block">
                                <span className="flex items-center justify-center w-5 h-5 bg-[#DCDCDC] rounded-full shrink-0">
    
    
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
    
    
    
    
                <div className='mx-[24px] mt-[32px] p-6 w-auto bg-white shadow-lg'>
                    {/* Contact Section */}
                    <div>
                        <h2 className="text-[20px] font-medium">Contact</h2>
                        <div className='border-b border-[#E6E6E7] w-auto items-center justify-center mt-[16px] mx-auto'></div>
                        <div className="flex mt-[16px]">
                            <div>
                                <label className="block font-normal text-[#373737] text-[14px]">Primary Mobile Number</label>
                                <input
                                    type="text"
                                    name="primaryMobile"
                                    maxLength="10"
                                    value={formData.primaryMobile}
                                    onChange={handleInputChange}
                                    className="px-3 py-2 border w-[247px] h-[48px] text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-none mt-[8px] rounded-lg"
                                />
                            </div>
                            <div className='ml-[16px]'>
                                <label className="block font-normal text-[#373737] text-[14px]">Secondary Mobile Number</label>
                                <input
                                    type="text"
                                    name="secondaryMobile"
                                    maxLength="10"
                                    value={formData.secondaryMobile}
                                    onChange={handleInputChange}
                                    className="px-3 py-2 border w-[247px] h-[48px] text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-none mt-[8px] rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
    
                    {/* Address Section */}
                    <div className="mt-[32px]">
                        <h2 className="text-[20px] font-medium">Address</h2>
                        <div className='border-b border-[#E6E6E7] w-auto items-center justify-center mt-[16px] mx-auto'></div>
                        <div className="flex">
                            {/* Primary Address */}
                            <div className='mt-4'>
                                <label className="block font-normal text-[#373737] text-[14px]">Primary Address</label>
                                <textarea
                                    name="primaryAddress"
                                    value={formData.primaryAddress}
                                    onChange={handleInputChange}
                                    className="px-3 mt-2 py-2 border w-[440px] h-[80px] border-[#E6E6E7] focus:outline-none text-[#696A70] text-[14px] font-normal rounded-lg"
                                    rows="2"
                                />
                                <div className="flex mt-4">
                                    <div>
                                        <label className="block font-normal text-[#373737] text-[14px]">Pincode</label>
                                        <input
                                            type="text"
                                            name="primaryPincode"
                                            maxLength="6"
                                            value={formData.primaryPincode}
                                            onChange={handleInputChange}
                                            className="px-3 py-2 border w-[178px] h-[48px] text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-none mt-[8px] rounded-lg"
                                        />
                                    </div>
                                    <div className='ml-4'>
                                        <label className="block font-normal text-[#373737] text-[14px]">City</label>
                                        <input
                                            type="text"
                                            name="primaryCity"
                                            value={formData.primaryCity}
                                            onChange={handleInputChange}
                                            className="px-3 py-2 border w-[247px] h-[48px] text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-none mt-[8px] rounded-lg"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="block font-normal text-[#373737] text-[14px]">State</label>
                                    <input
                                        type="text"
                                        name="primaryState"
                                        value={formData.primaryState}
                                        onChange={handleInputChange}
                                        className="px-3 py-2 border w-[178px] h-[48px] text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-none mt-[8px] rounded-lg"
                                    />
                                </div>
                            </div>
    
                            {/* Secondary Address */}
                            <div className='ml-[150px] mt-[16px]'>
                                <div className='flex items-center justify-between'>
                                    <label className="block font-normal text-[#373737] text-[14px]">Secondary Address</label>
                                    <div className="justify-center">
                                        <input
                                            type="checkbox"
                                            id="sameAsPrimary"
                                            className="mr-2 accent-[#232E42]"
                                            checked={sameAsPrimary}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label htmlFor="sameAsPrimary" className="font-normal justify-center text-[14px]">Same as Primary</label>
                                    </div>
                                </div>
                                <textarea
                                    name="secondaryAddress"
                                    value={sameAsPrimary ? formData.secondaryAddress : ''}
                                    onChange={handleInputChange}
                                    className="px-3 mt-[6px] py-2 border w-[440px] h-[80px] border-[#E6E6E7] focus:outline-none text-[#696A70] text-[14px] font-normal rounded-lg"
                                    rows="2"
                                    disabled={sameAsPrimary}
                                />
                                <div className="flex mt-4">
                                    <div>
                                        <label className="block font-normal text-[#373737] text-[14px]">Pincode</label>
                                        <input
                                            type="text"
                                            name="secondaryPincode"
                                            maxLength="6"
                                            value={sameAsPrimary ? formData.secondaryPincode : ''}
                                            onChange={handleInputChange}
                                            disabled={sameAsPrimary}
                                            className="px-3 py-2 border w-[178px] h-[48px] text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-none mt-[8px] rounded-lg"
                                        />
                                    </div>
                                    <div className='ml-[16px]'>
                                        <label className="block font-normal text-[#373737] text-[14px]">City</label>
                                        <input
                                            type="text"
                                            name="secondaryCity"
                                            value={sameAsPrimary ? formData.secondaryCity : ''}
                                            onChange={handleInputChange}
                                            disabled={sameAsPrimary}
                                            className="px-3 py-2 border w-[247px] h-[48px] text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-none mt-[8px] rounded-lg"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="block font-normal text-[#373737] text-[14px]">State</label>
                                    <input
                                        type="text"
                                        name="secondaryState"
                                        value={sameAsPrimary ? formData.secondaryState : ''}
                                        onChange={handleInputChange}
                                        disabled={sameAsPrimary}
                                        className="px-3 py-2 border w-[178px] h-[48px] text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-none mt-[8px] rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
    
                    {/* Emergency Contact Section */}
                    <div className="mt-[32px]">
                        <h2 className="text-[20px] font-medium">Emergency Contact</h2>
                        <div className='border-b border-[#E6E6E7] w-auto items-center justify-center mt-[16px] mx-auto'></div>
                        <div className="flex mt-[16px]">
                            <div>
                                <label className="block font-normal text-[#373737] text-[14px]">First Name</label>
                                <input
                                    type="text"
                                    name="emergencyFirstName"
                                    value={formData.emergencyFirstName}
                                    onChange={handleInputChange}
                                    className="px-3 py-2 border w-[247px] h-[48px] text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-none mt-[8px] rounded-lg"
                                />
                            </div>
                            <div className='ml-[16px]'>
                                <label className="block font-normal text-[#373737] text-[14px]">Last Name</label>
                                <input
                                    type="text"
                                    name="emergencyLastName"
                                    value={formData.emergencyLastName}
                                    onChange={handleInputChange}
                                    className="px-3 py-2 border w-[247px] h-[48px] text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-none mt-[8px] rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="flex mt-[16px]">
                            <div>
                                <label className="block font-normal text-[#373737] text-[14px]">Relationship</label>
                                <input
                                    type="text"
                                    name="emergencyRelationship"
                                    value={formData.emergencyRelationship}
                                    onChange={handleInputChange}
                                    className="px-3 py-2 border w-[247px] h-[48px] text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-none mt-[8px] rounded-lg"
                                />
                            </div>
                            <div className='ml-[16px]'>
                                <label className="block font-normal text-[#373737] text-[14px]">Emergency Contact Number</label>
                                <input
                                    type="text"
                                    name="emergencyContactNumber"
                                    maxLength="10"
                                    value={formData.emergencyContactNumber}
                                    onChange={handleInputChange}
                                    className="px-3 py-2 border w-[247px] h-[48px] text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-none mt-[8px] rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
    
                    {/* Next Button */}
                    <div className="flex justify-end mt-[32px]">
                        <button
                            type="button"
                            className={`bg-[#232E42]  text-white font-medium py-2 px-6 rounded-lg ${isNextButtonEnabled ? '' : 'opacity-50 cursor-not-allowed'}`}
                            onClick={handleNextClick}
                            disabled={!isNextButtonEnabled}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div> : <PhysicalDetailsForm/>
        }
        </div>
    );
}

export default ContactDetailsForm;
