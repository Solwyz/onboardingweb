import React, { useState, useEffect } from 'react';
import tickIcon from '../../../../Assets/HrTas/check.svg';
import SalaryDetailsForm from './SalaryDetailsForm';

function ProfessionalDetails() {
    const [showSalaryForm, setShowSalaryForm] = useState(false)
    const [formData, setFormData] = useState({
        dateOfJoin: '',
        endOfProbation: '',
        dateEffective: '',
        jobPosition: '',
        lineManager: '',
        department: '',
        branch: '',
        level: '',
        jobType: '',
        description: '',
        leaveFlow: '',
        workday: '',
        holiday: ''
    });

    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    // Check if all required fields are filled
    useEffect(() => {
        const isComplete = Object.values(formData).every((value) => value !== '');
        setIsButtonEnabled(isComplete);
    }, [formData]);

    // Restrict future date selection for dateOfJoin
    const todayDate = new Date().toISOString().split('T')[0];

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Set constraints for endOfProbation and dateEffective based on dateOfJoin
        if (name === 'dateOfJoin') {
            setFormData((prevData) => ({
                ...prevData,
                dateOfJoin: value,
                endOfProbation: '',
                dateEffective: ''
            }));
        } else if (name === 'endOfProbation') {
            const joinDate = new Date(formData.dateOfJoin);
            const selectedDate = new Date(value);
            if (selectedDate > joinDate) {
                setFormData((prevData) => ({
                    ...prevData,
                    endOfProbation: value
                }));
            }
        } else if (name === 'dateEffective') {
            const joinDate = new Date(formData.dateOfJoin);
            const selectedDate = new Date(value);
            if (selectedDate >= joinDate) {
                setFormData((prevData) => ({
                    ...prevData,
                    dateEffective: value
                }));
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    // Handle button click
    const handleNext = () => {
        console.log(formData); // Log the form data to the console
        setShowSalaryForm(true);
    };;

    return (
        <div>
            {!showSalaryForm ?
                <div className='bg-[#F8FAFB]'>
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
                                    <span className="flex items-center justify-center w-5 h-5 bg-[#DCDCDC] rounded-full shrink-0">
                                        {/* No tick icon for this step */}
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

                    <div className='mx-[24px] mt-[32px] p-6 w-auto bg-white shadow-lg'>
                        <div className="">
                            <div className="">
                                <h3 className="text-[20px] font-medium">Professional Details</h3>
                            </div>
                            <div className=' border-b border-[#E6E6E7] w-auto items-center justify-center mt-[16px] mx-auto'>

                            </div>

                            <div className='flex mt-[16px]'>
                            <div>
                                    <label className="block text-sm text-[#373737] font-normal">Date of Joined</label>
                                    <input
                                        type="date"
                                        name="dateOfJoin"
                                        value={formData.dateOfJoin}
                                        onChange={handleChange}
                                        max={todayDate}
                                        className="w-[247px] h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] focus:outline-none font-normal"
                                    />
                                </div>

                                <div className='ml-[16px]'>
                                    <label className="block text-sm font-normal text-[#373737]">End of Probation</label>
                                    <input
                                        type="date"
                                        name="endOfProbation"
                                        value={formData.endOfProbation}
                                        onChange={handleChange}
                                        min={formData.dateOfJoin}
                                        className="w-[247px] h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] focus:outline-none font-normal"
                                    />
                                </div>
                            </div>

                            <div className='flex mt-[16px]'>
                                <div>
                                    <label className="block text-sm font-normal text-[#373737]">Date Effective</label>
                                    <input
                                        type="date"
                                        name="dateEffective"
                                        value={formData.dateEffective}
                                        onChange={handleChange}
                                        min={formData.dateOfJoin}
                                        className="w-[247px] h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] focus:outline-none font-normal"
                                    />
                                </div>


                                <div className='ml-[16px]'>
                                    <label className="block text-sm font-normal text-[#373737]">Job Position</label>
                                    <select
                                        name="jobPosition"
                                        value={formData.jobPosition}
                                        onChange={handleChange}
                                        className="w-[247px] focus:outline-none px-[16px] py-[14px] h-[48px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal"
                                    >
                                        <option>Select Your Job Position</option>

                                        <option>Frontend Developer</option>
                                    </select>
                                </div>


                                <div className='ml-[16px]'>
                                    <label className="block text-sm font-normal text-[#373737]">Line Manager</label>
                                    <select
                                        name="lineManager"
                                        value={formData.lineManager}
                                        onChange={handleChange}
                                        className="w-[247px] focus:outline-none px-[16px] py-[14px] h-[48px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal"
                                    >
                                        <option>Select Your Line Manager</option>

                                        <option>Vijay T</option>
                                    </select>
                                </div>


                                

                            </div> 

                            <div className='flex mt-[16px]'>
                                <div>
                                    <label className="block text-sm font-normal text-[#373737]">Department</label>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="w-[247px] focus:outline-none px-[16px] py-[14px] h-[48px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal"
                                    >
                                        <option>Select Your Department</option>

                                        <option>Web Development</option>
                                    </select>
                                </div>

                                <div className='ml-[16px]'>
                                    <label className="block text-sm font-normal text-[#373737]">Branch</label>
                                    <select
                                        name="branch"
                                        value={formData.branch}
                                        onChange={handleChange}
                                        className="w-[247px] focus:outline-none px-[16px] py-[14px] h-[48px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal"
                                    >
                                        <option>Select Your Branch</option>

                                        <option>Technical</option>
                                    </select>
                                </div>

                                <div className='ml-[16px]'>
                                    <label className="block text-sm font-normal text-[#373737]">Level</label>
                                    <select
                                        name="level"
                                        value={formData.level}
                                        onChange={handleChange}
                                        className="w-[247px] focus:outline-none px-[16px] py-[14px] h-[48px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal"
                                    >
                                        <option>Select Your Level</option>

                                        <option>1</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mt-[32px]">
                            <div className="">
                                <div className="">
                                    <h3 className="text-[20px] font-medium">Employment Terms</h3>
                                </div>
                                <div className=' border-b border-[#E6E6E7] w-auto items-center justify-center mt-[16px] mx-auto'>

                                </div>

                                <div className='flex mt-[16px]'>
                                <div>
                                    <label className="block text-sm font-normal text-[#373737]">Date Effective</label>
                                    <input
                                        type="date"
                                        name="dateEffective"
                                        value={formData.dateEffective}
                                        onChange={handleChange}
                                        min={formData.dateOfJoin}
                                        className="w-[247px] h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] focus:outline-none font-normal"
                                    />
                                </div>

                                    <div className='ml-[16px]'>
                                        <label className="block text-sm text-[#373737] font-normal">Job Type</label>
                                        <select
                                            name="jobType"
                                            value={formData.jobType}
                                            onChange={handleChange}
                                            className="w-[247px] focus:outline-none h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal"
                                        >
                                            <option>Select Your Job Type</option>

                                            <option>Full Time</option>
                                        </select>
                                    </div>

                                    <div className='ml-[16px]'>
                                        <label className="block text-sm text-[#373737] font-normal">Description</label>
                                        <input
                                            type="text"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="w-[247px] focus:outline-none h-[48px] mt-[8px] px-[16px] py-[14px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal"
                                        />
                                    </div>
                                </div>

                                <div className='flex mt-[16px]'>
                                    <div>
                                        <label className="block text-sm text-[#373737] font-normal">Leave Flow</label>
                                        <input
                                            type="text"
                                            name="leaveFlow"
                                            value={formData.leaveFlow}
                                            onChange={handleChange}
                                            className="w-[247px] focus:outline-none h-[48px] mt-[8px] px-[16px] py-[14px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal"
                                        />
                                    </div>

                                    <div className='ml-[16px]'>
                                        <label className="block text-sm text-[#373737] font-normal">Workday</label>
                                        <input
                                            type="text"
                                            name="workday"
                                            value={formData.workday}
                                            onChange={handleChange}
                                            className="w-[247px] focus:outline-none h-[48px] mt-[8px] px-[16px] py-[14px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal"
                                        />
                                    </div>

                                    <div className='ml-[16px]'>
                                        <label className="block text-sm text-[#373737] font-normal">Holiday</label>
                                        <select
                                            name="holiday"
                                            value={formData.holiday}
                                            onChange={handleChange}
                                            className="w-[247px] focus:outline-none h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal"
                                        >
                                            <option>Select Your Holiday Location</option>

                                            <option>India</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-[32px]">
                            <button
                                className={`px-6 py-2 w-[92px] h-[48px] text-white font-normal text-sm rounded-md 
                        ${isButtonEnabled ? 'bg-[#2B2342]' : 'bg-gray-400 cursor-not-allowed'}`}
                                onClick={handleNext}
                                disabled={!isButtonEnabled}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
                : <SalaryDetailsForm/>
            }
        </div>
    );
}

export default ProfessionalDetails;
