import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const navigate = useNavigate();

  const [isVerified, setIsVerified] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    branchName: '',
    companyAddress1: '',
    companyAddress2: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    incomeCertificate: null,
  });

  const [errors, setErrors] = useState({});
  const [otpMessage, setOtpMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [otp, setOtp] = useState('');

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'companyName':
        if (!value.trim()) {
          error = 'Company name is required !';
        }
        break;
      case 'branchName':
        if (!value.trim()) {
          error = 'Branch name is required !';
        }
        break;
      case 'companyAddress1':
        if (!value.trim()) {
          error = 'Company address is required !';
        }
        break;
      case 'companyAddress2':
        if (!value.trim()) {
          error = 'Company address 2 is required !';
        }
        break;
      case 'phoneNumber':
        const phoneRegex = /^[0-9]{10}$/;
        if (!value.trim()) {
          error = 'Phone number is required !';
        } else if (!phoneRegex.test(value)) {
          error = 'Enter a valid Phone Number !';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          error = 'Email is required !';
        } else if (!emailRegex.test(value)) {
          error = 'Enter a valid email address';
        }
        break;
      case 'password':
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
        if (!value.trim()) {
          error = 'Password is required !';
        } else if (!passwordRegex.test(value)) {
          error =
            'Password must be at least 6 characters long, contain at least one number and one special character!';
        }
        break;
      case 'confirmPassword':
        if (!value.trim()) {
          error = 'Confirm password is required !';
        } else if (value !== formData.password) {
          error = 'Passwords do not match!';
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newError = validateField(name, value);

    setFormData({
      ...formData,
      [name]: value,
    });

    
    setErrors({
      ...errors,
      [name]: newError,
    });
  };

  const handleKeyDown = (e) => {
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
      e.preventDefault();
    }
  };

  const validateForm = () => {
    let formErrors = {};

    for (const field in formData) {
      const error = validateField(field, formData[field]);
      if (error) {
        formErrors[field] = error;
      }
    }

    return formErrors;
  };

  const checkFormValidity = () => {
    const hasErrors = Object.keys(errors).some((key) => errors[key]);
    const allFieldsFilled = Object.values(formData).every(
      (value, index) => index === 8 || value.trim() !== '' // Excluding incomeCertificate (index 8)
    );

    setIsFormValid(!hasErrors && allFieldsFilled);
  };

  useEffect(() => {
    checkFormValidity();
  }, [formData, errors])

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setOtpMessage(`Enter OTP sent to ${formData.phoneNumber}`);
      setIsVerified(true);
      console.log(formData);
      console.log('income certificate :', formData.incomeCertificate);
      setFormData({
        companyName: '',
        branchName: '',
        companyAddress1: '',
        companyAddress2: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        incomeCertificate: null,
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const handleOtpVerify = () => {
    console.log("Verifying OTP:", otp);
  }

  return (
    <div>
      <div className='mt-24 w-[600px] border-2 shadow-lg rounded-md mx-auto pt-4 pb-20'>
        <div className='text-center text-[24px] font-semibold mt-8'>Create Account</div>
        {isVerified ? (
          <div>
            <div className='text-center'>
              <div className='font-medium mt-8'>{otpMessage} :</div>
              <input type='number' value={otp} className='border border-black w-[250px] mt-4' onChange={(e) => setOtp(e.target.value)}
                maxLength={6}>
              </input>
              <style jsx>{`
                input[type='number'] {
               -moz-appearance: textfield; /* Firefox */
                 }

                input[type='number']::-webkit-outer-spin-button,
                input[type='number']::-webkit-inner-spin-button {
                -webkit-appearance: none; /* Chrome, Safari */
                margin: 0;
                }
              `}</style>
            </div>
            <div className='flex justify-center mt-6'>
              <button className={`bg-blue-600 shadow-lg px-3 py-2 text-white rounded-lg ${!otp ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleOtpVerify}
                disabled={!otp}
              >
                Verify
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className='mx-12 mt-8 text-[16px] flex justify-between'>
              <label>Company name : </label>
              <input
                className='border rounded w-[250px]'
                type='text'
                name='companyName'
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
            {errors.companyName && (
              <div className='text-[12px] mx-14 text-red-500 text-right'>{errors.companyName}</div>
            )}

            <div className='mx-12 mt-4 text-[16px] flex justify-between'>
              <label>Branch name : </label>
              <input
                className='border rounded w-[250px]'
                type='text'
                name='branchName'
                value={formData.branchName}
                onChange={handleChange}
              />
            </div>
            {errors.branchName && (
              <div className='text-[12px] mx-14 text-red-500 text-right'>{errors.branchName}</div>
            )}

            <div className='mx-12 mt-4 text-[16px] flex justify-between'>
              <label>Company address 1 : </label>
              <input
                className='border rounded w-[250px]'
                type='text'
                name='companyAddress1'
                value={formData.companyAddress1}
                onChange={handleChange}
              />
            </div>
            {errors.companyAddress1 && (
              <div className='text-[12px] mx-14 text-red-500 text-right'>{errors.companyAddress1}</div>
            )}

            <div className='mx-12 mt-4 text-[16px] flex justify-between'>
              <label>Company address 2 : </label>
              <input
                className='border rounded w-[250px]'
                type='text'
                name='companyAddress2'
                value={formData.companyAddress2}
                onChange={handleChange}
              />
            </div>
            {errors.companyAddress2 && (
              <div className='text-[12px] mx-14 text-red-500 text-right'>{errors.companyAddress2}</div>
            )}

            <div className='mx-12 mt-4 text-[16px] flex justify-between'>
              <label>Phone number : </label>
              <input
                className='border rounded w-[250px]'
                type='text'
                name='phoneNumber'
                onKeyDown={handleKeyDown}
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            {errors.phoneNumber && (
              <div className='text-[12px] mx-14 text-red-500 text-right'>{errors.phoneNumber}</div>
            )}

            <div className='mx-12 mt-4 text-[16px] flex justify-between'>
              <label>Email : </label>
              <input
                className='border rounded w-[250px]'
                type='text'
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && (
              <div className='text-[12px] mx-14 text-red-500 text-right'>{errors.email}</div>
            )}

            <div className='mx-12 mt-4 text-[16px] flex justify-between'>
              <label>Password : </label>
              <input
                className='border rounded w-[250px]'
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && (
              <div className='text-[12px] mx-14 text-red-500 text-right'>{errors.password}</div>
            )}

            <div className='mx-12 mt-4 text-[16px] flex justify-between'>
              <label>Confirm Password : </label>
              <input
                className='border rounded w-[250px]'
                type='password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            {errors.confirmPassword && (
              <div className='text-[12px] mx-14 text-red-500 text-right'>{errors.confirmPassword}</div>
            )}

            <div className='mx-12 mt-4 text-[16px] flex justify-between'>
              <label>Income Certificate (Optional) : </label>
              <input
                className='border rounded w-[250px]'
                type='file'
                name='incomeCertificate'
                onChange={handleChange}
              />
            </div>

            <div className='flex justify-center mt-8'>
              <button
                className={`bg-blue-600 shadow-lg px-3 py-2 text-white rounded-lg ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                type='submit'
                disabled={!isFormValid} 
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default SignUpPage;
