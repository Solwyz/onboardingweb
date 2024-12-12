import React, { useEffect, useState } from 'react'
import bar1 from '../../../../Assets/HrTas/employeeForms/form1.png'
import tickIcon from '../../../../Assets/HrTas/check.svg';
import ProfessionalDetails from './ProfessionalDetails';
import NewProgressive from './NewProgressive';


function BasicDetailsForm({editingEmployee}) {

    const [maxDate, setMaxDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear() - 18;
        const month = (`0${today.getMonth() + 1}`).slice(-2);
        const day = (`0${today.getDate()}`).slice(-2);
        setMaxDate(`${year}-${month}-${day}`);

        if(editingEmployee) {
            setFormData({
                firstName: editingEmployee.firstName,
                lastName: editingEmployee.empId,
                nationality: editingEmployee.nationality
            });
        }
    },[])

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
            designation &&
            department &&
            email &&
            !errors.email &&
            !errors.firstName &&
            !errors.panNumber &&
            !errors.passport ;

        setIsFormValid(isValid);
    }, [formData, errors])

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
    }

    const validateFirstName = (firstName) => {
        const firstNameRegex = /^[A-Za-z].*$/;
        return firstNameRegex.test(firstName);
    }

    const validatePanNumber =(panNumber)=> {
        const alphanumericRegex = /^[a-zA-Z0-9]*$/;
        return alphanumericRegex.test(panNumber);
    }

    const validatePassport =(passport)=> {
        const alphanumericRegex = /^[a-zA-Z0-9]*$/;
        return alphanumericRegex.test(passport);
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

        if (name === 'firstName') {
            if(!validateFirstName(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    firstName: 'First Name cannot starts with a number'
                }))
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    firstName: ''
                }))
            }
        }

        if(name === 'panNumber') {
            if(!validatePanNumber(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    panNumber: 'PAN number does not contain special characters'
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    panNumber: ''
                }))
            }
        }

        if(name === 'passport') {
            if(!validatePassport(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    passport: 'Passport number does not contain special characters'
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    passport: ''
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

                    <NewProgressive stage={"Basic"}/>


                    {/* <img className='w-[532px] h-[42px] mx-auto' src={bar1}></img> */}
                    <form className=' shadow mt-8 p-6 bg-[#FFFFFF]' onSubmit={handleSubmit}>
                        <div className='text-[20px] font-medium border-b pb-4'>Basic Details</div>

                        <div className='flex gap-4 text-[#373737]'>
                            <div className='mt-6'>
                                <div className='text-[14px]'>First Name</div>
                                <input
                                    type='text'
                                    name='firstName'
                                    value={formData.firstName}
                                    onChange={handleFormChange}
                                    className='text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] focus:outline-[#A4A4E5]'
                                />
                                {errors.firstName && (
                                    <div className='text-red-500 text-sm mt-1'>{errors.firstName}</div>
                                )}
                            </div>
                            <div className='mt-6'>
                                <div className='text-[14px]'>Last Name</div>
                                <input
                                    type='text'
                                    name='lastName'
                                    value={formData.lastName}
                                    onChange={handleFormChange}
                                    className='text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] focus:outline-[#A4A4E5]'
                                />
                            </div>
                        </div>

                        <div className='flex gap-4 text-[#373737]'>
                            <div className='mt-6'>
                                <div className='text-[14px]'>Gender</div>
                                <select
                                    name='gender'
                                    value={formData.gender}
                                    onChange={handleFormChange}
                                    className='text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] focus:outline-[#A4A4E5]'
                                >
                                    <option value=''>Select Gender</option>
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
                                    <option value='Others'>Others</option>
                                </select>
                            </div>
                            <div className='mt-6'>
                                <div className='text-[14px]'>Nationality</div>
                                <select
                                    name='nationality'
                                    value={formData.nationality}
                                    onChange={handleFormChange}
                                    className='text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] focus:outline-[#A4A4E5]'
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
                                    max={maxDate}
                                    className='text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] focus:outline-[#A4A4E5]'
                                />
                            </div>
                        </div>

                        <div className='text-[20px] font-medium border-b pb-4 mt-8'>ID Proof</div>

                        <div className='flex gap-4 text-[#373737]'>
                            <div className='mt-6'>
                                <div className='text-[14px]'>PAN Number</div>
                                <input
                                    type='text'
                                    name='panNumber'
                                    value={formData.panNumber}
                                    onChange={handleFormChange}
                                    className='text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] focus:outline-[#A4A4E5]'
                                />
                                {errors.panNumber && (
                                    <div className='text-red-500 text-sm mt-1'>{errors.panNumber}</div>
                                )}
                            </div>
                            <div className='mt-6'>
                                <div className='text-[14px]'>Passport (Optional)</div>
                                <input
                                    type='text'
                                    name='passport'
                                    value={formData.passport}
                                    onChange={handleFormChange}
                                    className='text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] focus:outline-[#A4A4E5]'
                                />
                                {errors.passport && (
                                    <div className='text-red-500 text-sm mt-1'>{errors.passport}</div>
                                )}
                            </div>
                        </div>

                        <div className='text-[20px] font-medium border-b pb-4 mt-8'>Job</div>

                        <div className='flex gap-4 text-[#373737]'>
                            <div className='mt-6'>
                                <div className='text-[14px]'>Designation</div>
                                <select
                                    name='designation'
                                    value={formData.designation}
                                    onChange={handleFormChange}
                                    className='text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] focus:outline-[#A4A4E5]'
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
                                    className='text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] focus:outline-[#A4A4E5]'
                                >
                                    <option value=''>Department</option>
                                    <option value='Development'>Web Development</option>
                                    <option value='Marketing'>Mobile App Development</option>
                                </select>
                            </div>
                        </div>

                        <div className='flex gap-4 text-[#373737]'>
                            <div className='mt-6'>
                                <div className='text-[14px]'>Email</div>
                                <input
                                    type='text'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleFormChange}
                                    className='text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] focus:outline-[#A4A4E5]'
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
                : <ProfessionalDetails setShowProfessionalForm={setShowProfessionalForm}/>
            }
        </div>

    )
}

export default BasicDetailsForm
