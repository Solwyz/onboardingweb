import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
    

    const navigate = useNavigate();

    const [isVerified, setIsVerified] = useState(false)

    const [formData, setFormData] = useState(
        {
            companyName: "",
            branchName: "",
            companyAddress1: "",
            companyAddress2: "",
            phoneNumber: "",
            email: "",
            password: "",
            confirmPassword: "",
            incomeCertificate: null
        }
    )

    const [errors, setErrors] = useState({});
    const [otpMessage, setOtpMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(
            {
                ...formData,
                [name]: value
            }
        )
    }

    const validateForm = () => {
        let formErrors = {};

        if (!formData.companyName.trim()) {
            formErrors.companyName = "Company name is required !"
        }

        if (!formData.branchName.trim()) {
            formErrors.branchName = "Branch name is required !"
        }

        if (!formData.companyAddress1.trim()) {
            formErrors.companyAddress1 = "Company address is required !"
        }

        if (!formData.companyAddress2.trim()) {
            formErrors.companyAddress2 = "Company adress 2 is required !"
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!formData.phoneNumber.trim()) {
            formErrors.phoneNumber = "Phone number is required !"
        } else if (!phoneRegex.test(formData.phoneNumber)) {
            formErrors.phoneNumber = "Enter a valid Phone Number !"
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            formErrors.email = "Email is required !"
        } else if (!emailRegex.test(formData.email)) {
            formErrors.email = "Enter a valid email address"
        }

        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
        if (!formData.password.trim()) {
            formErrors.password = "Password is required !"
        } else if (!passwordRegex.test(formData.password)) {
            formErrors.password = "Password must be atleast 6 characters long, contain atleast one number and one special character!";
        }

        if (!formData.confirmPassword.trim()) {
            formErrors.confirmPassword = "Confirm password is required !"
        } else if (formData.confirmPassword !== formData.password) {
            formErrors.confirmPassword = "Passwords do not match!";
        }


        return formErrors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            setOtpMessage(`Enter OTP sent to ${formData.phoneNumber}`)
            setIsVerified(true)
            console.log(formData);
            console.log("income certificate :", formData.incomeCertificate);
            setFormData(
                {
                    companyName: "",
                    branchName: "",
                    companyAddress1: "",
                    companyAddress2: "",
                    phoneNumber: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    incomeCertificate: null
                }
            )
            setErrors({})


        } else {
            setErrors(validationErrors);
        }
    }

    return (
        <div>
            <div className='mt-24 w-[600px] border-2 shadow-lg rounded-md mx-auto pt-4 pb-20'>
                <div className='text-center text-[24px] font-semibold mt-8'>Create Account</div>
                {isVerified ?
                    <div>
                        <div className='text-center'>
                            <div className='font-medium mt-8'>{otpMessage} :</div>
                            <input type='text' className='border border-black w-[250px] mt-4'></input>
                        </div>
                        <div className='flex justify-center mt-6'>
                            <button className='bg-blue-600 shadow-lg px-3 py-2 text-white rounded-lg'>Verify</button>
                        </div>
                    </div>
                    :
                    <form onSubmit={handleSubmit}>

                        <div className='mx-12 mt-8 text-[16px] flex justify-between'>
                            <label>Company name : </label>
                            <input className='border rounded w-[250px]' type='text' name='companyName' value={formData.companyName} onChange={handleChange}></input>
                        </div>
                        {errors.companyName && <div className='text-[12px] mx-14 text-red-500 text-right'>{errors.companyName}</div>}


                        <div className='mx-12 mt-4 text-[16px] flex justify-between'>
                            <label>Branch name : </label>
                            <input className='border rounded w-[250px]' type='text' name='branchName' value={formData.branchName} onChange={handleChange}></input>

                        </div>
                        {errors.branchName && <div className='text-[12px] mx-14 text-red-500 text-right'>{errors.branchName}</div>}

                        <div className='mx-12 mt-4 text-[16px] flex justify-between'>
                            <label>Company address 1 : </label>
                            <input className='border rounded w-[250px]' type='text' name='companyAddress1' value={formData.companyAddress1} onChange={handleChange}></input>

                        </div>
                        {errors.companyAddress1 && <div className='text-[12px] mx-14 text-red-500 text-right'>{errors.companyAddress1}</div>}

                        <div className='mx-12 mt-4 text-[16px] flex justify-between'>
                            <label>Company address 2 : </label>
                            <input className='border rounded w-[250px]' type='text' name='companyAddress2' value={formData.companyAddress2} onChange={handleChange}></input>

                        </div>
                        {errors.companyAddress2 && <div className='text-[12px] mx-14 text-red-500 text-right'>{errors.companyAddress2}</div>}

                        <div className='mx-12 mt-4 text-[16px] flex justify-between'>
                            <label>Phone number : </label>
                            <input className='border rounded w-[250px]' type='text' name='phoneNumber' value={formData.phoneNumber} onChange={handleChange}></input>

                        </div>
                        {errors.phoneNumber && <div className='text-[12px] mx-14 text-red-500 text-right'>{errors.phoneNumber}</div>}

                        <div className='mx-12 mt-4 text-[16px] flex justify-between'>
                            <label>Email : </label>
                            <input className='border rounded w-[250px]' type='text' name='email' value={formData.email} onChange={handleChange}></input>

                        </div>
                        {errors.email && <div className='text-[12px] mx-14 text-red-500 text-right'>{errors.email}</div>}

                        <div className='mx-12 mt-4 text-[16px] flex justify-between'>
                            <label>Password : </label>
                            <input className='border rounded w-[250px]' type='password' name='password' value={formData.password} onChange={handleChange}></input>

                        </div>
                        {errors.password && <div className='text-[12px] mx-14 text-red-500 text-right'>{errors.password}</div>}

                        <div className='mx-12 mt-4 text-[16px] flex justify-between'>
                            <label>Confirm Password : </label>
                            <input className='border rounded w-[250px]' type='password' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange}></input>

                        </div>
                        {errors.confirmPassword && <div className='text-[12px] mx-14 text-red-500 text-right'>{errors.confirmPassword}</div>}

                        <div className='mx-12 mt-4 text-[16px] flex justify-between'>
                            <label>Income Certificate (Optional) : </label>
                            <input className='border rounded w-[250px]' type='file' name='incomeCertificate' value={formData.incomeCertificate} onChange={handleChange}></input>
                        </div>
                        <div className='flex justify-center mt-8'>
                            <button type='submit' className='bg-blue-600 shadow-lg px-3 py-2 text-white rounded-lg'>Submit</button>
                        </div>
                    </form>
                }
            </div>

        </div>
    )
}

export default SignUpPage
