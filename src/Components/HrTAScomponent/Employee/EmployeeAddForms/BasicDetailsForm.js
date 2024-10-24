import React, { useEffect, useState } from 'react'
import bar1 from '../../../../Assets/HrTas/employeeForms/form1.png'
import tickIcon from '../../../../Assets/HrTas/check.svg';
import ProfessionalDetails from './ProfessionalDetails';



function BasicDetailsForm() {

    const [isFormValid, setIsFormValid] = useState(false)
    const [showProfessionalForm, setShowProfessionalForm] = useState(false)
    const [errors, setErrors] = useState({
        email: ''
    })

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        nationality: 'Indian',
        dateOfBirth: '',
        panNumber: '',
        passport: '',
        designation: '',
        department: '',
        email: ''
    });

    useEffect(() => {
        const { firstName,
            lastName,
            gender,
            nationality,
            dateOfBirth,
            panNumber,
            passport,
            designation,
            department,
            email } = formData

        const isValid = firstName &&
            lastName &&
            gender &&
            nationality &&
            dateOfBirth &&
            panNumber &&
            passport &&
            designation &&
            department &&
            email &&
            !errors.email;

        setIsFormValid(isValid);
    }, [formData, errors])

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'email') {
            if (!validateEmail(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: 'Invalid email address'
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: ''
                }))
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isFormValid) {
            console.log(formData)
            setShowProfessionalForm(true)
        }
    }

    return (
        <div>
            {!showProfessionalForm ?
                <div className='mt-8'>

                    <div className='flex justify-center mt-[32px]'>
                        <ol className="flex items-center w-[678px]">
                            {/* Step 1 */}
                            <li className="flex flex-col items-start  w-full text-center">
                                <div className="flex w-full items-center text-[#2B2342] after:content-[''] after:w-full after:h-1 after:border-b-[1px] after:border-[#C2C2C2] after:inline-block">
                                    <span className="flex items-center justify-center w-5 h-5 bg-[#2B2342] rounded-full shrink-0">
                                        <img src={tickIcon} alt="" className="w-3 h-3" />
                                    </span>
                                </div>
                                <span className="mt-2 text-sm font-normal  text-[#2B2342] ml-[-5px]">Basic</span> {/* Text directly below the circle */}
                            </li>

                            {/* Step 2 */}
                            <li className="flex flex-col  items-start w-full text-center">
                                <div className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b-[1px] after:border-[#C2C2C2] after:inline-block">
                                    <span className="flex items-center justify-center w-5 h-5 bg-[#DCDCDC] rounded-full shrink-0">
                                        {/* <img src={tickIcon} alt="" className="w-3 h-3" /> */}
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


                    {/* <img className='w-[532px] h-[42px] mx-auto' src={bar1}></img> */}
                    <form className='border shadow mt-8 p-6' onSubmit={handleSubmit}>
                        <div className='text-[20px] font-medium border-b pb-4'>Basic Details</div>

                        <div className='flex gap-4'>
                            <div className='mt-6'>
                                <div className='text-[14px]'>First Name</div>
                                <input
                                    type='text'
                                    name='firstName'
                                    value={formData.firstName}
                                    onChange={handleFormChange}
                                    className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
                                />
                            </div>
                            <div className='mt-6'>
                                <div className='text-[14px]'>Last Name</div>
                                <input
                                    type='text'
                                    name='lastName'
                                    value={formData.lastName}
                                    onChange={handleFormChange}
                                    className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
                                />
                            </div>
                        </div>

                        <div className='flex gap-4'>
                            <div className='mt-6'>
                                <div className='text-[14px]'>Gender</div>
                                <select
                                    name='gender'
                                    value={formData.gender}
                                    onChange={handleFormChange}
                                    className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
                                >
                                    <option value=''>Select Gender</option>
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
                                </select>
                            </div>
                            <div className='mt-6'>
                                <div className='text-[14px]'>Nationality</div>
                                <select
                                    name='nationality'
                                    value={formData.nationality}
                                    onChange={handleFormChange}
                                    className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
                                >
                                    <option value='Indian'>Indian</option>
                                    <option value='UAE'>UAE</option>

                                </select>
                            </div>
                            <div className='mt-6'>
                                <div className='text-[14px]'>Date of Birth</div>
                                <input
                                    type='date'
                                    name='dateOfBirth'
                                    value={formData.dateOfBirth}
                                    onChange={handleFormChange}
                                    className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
                                />
                            </div>
                        </div>

                        <div className='text-[20px] font-medium border-b pb-4 mt-8'>ID Proof</div>

                        <div className='flex gap-4'>
                            <div className='mt-6'>
                                <div className='text-[14px]'>PAN Number</div>
                                <input
                                    type='text'
                                    name='panNumber'
                                    value={formData.panNumber}
                                    onChange={handleFormChange}
                                    className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
                                />
                            </div>
                            <div className='mt-6'>
                                <div className='text-[14px]'>Passport</div>
                                <input
                                    type='text'
                                    name='passport'
                                    value={formData.passport}
                                    onChange={handleFormChange}
                                    className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
                                />
                            </div>
                        </div>

                        <div className='text-[20px] font-medium border-b pb-4 mt-8'>Job</div>

                        <div className='flex gap-4'>
                            <div className='mt-6'>
                                <div className='text-[14px]'>Designation</div>
                                <select
                                    name='designation'
                                    value={formData.designation}
                                    onChange={handleFormChange}
                                    className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
                                >
                                    <option value=''>Designation</option>
                                    <option value='Development'>Frontend Developer</option>
                                    <option value='Marketing'>Backend Developer</option>
                                </select>
                            </div>
                            <div className='mt-6'>
                                <div className='text-[14px]'>Department</div>
                                <select
                                    name='department'
                                    value={formData.department}
                                    onChange={handleFormChange}
                                    className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
                                >
                                    <option value=''>Department</option>
                                    <option value='Development'>Web Development</option>
                                    <option value='Marketing'>Mobile App Development</option>
                                </select>
                            </div>
                        </div>

                        <div className='flex gap-4'>
                            <div className='mt-6'>
                                <div className='text-[14px]'>Email</div>
                                <input
                                    type='text'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleFormChange}
                                    className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
                                />
                                {errors.email && (
                                    <div className='text-red-500 text-sm mt-1'>{errors.email}</div>
                                )}
                            </div>
                        </div>

                        <div className='flex justify-end'>
                            <button
                                type='submit'
                                className={`text-[14px] text-white bg-[#2B2342] rounded px-8 py-4 mt-8 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={!isFormValid}
                            >
                                Activate my account
                            </button>
                        </div>

                    </form>
                </div>
                : <ProfessionalDetails/>
            }
        </div>

    )
}

export default BasicDetailsForm
