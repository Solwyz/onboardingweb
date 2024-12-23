import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import medoLogo from '../../Assets/medoLogo.svg';

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
          error = 'Company name is required!';
        }
        break;
      case 'branchName':
        if (!value.trim()) {
          error = 'Branch name is required!';
        }
        break;
      case 'companyAddress1':
        if (!value.trim()) {
          error = 'Company address is required!';
        }
        break;
      case 'companyAddress2':
        if (!value.trim()) {
          error = 'Company address 2 is required!';
        }
        break;
      case 'phoneNumber':
        const phoneRegex = /^[0-9]{10}$/;
        if (!value.trim()) {
          error = 'Phone number is required!';
        } else if (!phoneRegex.test(value)) {
          error = 'Enter a valid Phone Number!';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          error = 'Email is required!';
        } else if (!emailRegex.test(value)) {
          error = 'Enter a valid email address!';
        }
        break;
      case 'password':
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
        if (!value.trim()) {
          error = 'Password is required!';
        } else if (!passwordRegex.test(value)) {
          error =
            'Password must be at least 6 characters long, contain at least one number and one special character!';
        }
        break;
      case 'confirmPassword':
        if (!value.trim()) {
          error = 'Confirm password is required!';
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
  
    // Restrict phoneNumber to numeric input only
    if (name === "phoneNumber" && !/^\d*$/.test(value)) {
      return; // Do not update the state if the input contains non-numeric characters
    }
  
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
  

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      incomeCertificate: e.target.files[0],
    });
  };

  const validateForm = () => {
    let formErrors = {};

    for (const field in formData) {
      if (field !== 'incomeCertificate') {
        const error = validateField(field, formData[field]);
        if (error) {
          formErrors[field] = error;
        }
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
  }, [formData, errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setOtpMessage(`Enter OTP sent to ${formData.phoneNumber}`);
      setIsVerified(true);
      console.log(formData);
      console.log('Income certificate:', formData.incomeCertificate);
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
    console.log('Verifying OTP:', otp);
    navigate('/');
  };

  return (
    <div className="flex">
    {/* Right Section - Branding */}
    <div className="flex w-1/2 items-center justify-center p-6">
      <div className="text-center bg-adminLogin bg-cover w-[801px] h-[976px] rounded-2xl"></div>
    </div>
    {/* Left Section - Form */}
    <div className="w-1/2 p-6">
      <div className="flex justify-end">
        <img src={medoLogo} alt="Medopharm Logo" className="item-end" />
      </div>
      <div className="text-center text-2xl font-semibold text-gray-800 mt-[40px]">Create a Free Account</div>
      <div className="bg-white p-8 rounded-lg shadow-lg mt-8">
        {isVerified ? (
          <div className="flex items-center justify-center h-screen">
  <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Verify OTP</h2>
    <p className="text-lg text-gray-600 mb-6 text-center">{otpMessage}</p>
    <div className="text-center">
      <input
        type="number"
        value={otp}
        className="border-2 border-gray-300 rounded-lg w-full px-4 py-2 mb-4 focus:outline-none focus:border-blue-500 transition duration-200"
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6}
        placeholder="Enter OTP"
      />
      <button
        className={`w-full bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ${
          !otp ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleOtpVerify}
        disabled={!otp}
      >
        Verify
      </button>
    </div>
  </div>
</div>

        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: Company Name and Branch Name */}
            <div className="flex space-x-4">
              {[
                { label: 'Company Name', name: 'companyName' },
                { label: 'Branch Name', name: 'branchName' },
              ].map(({ label, name, type = 'text' }) => (
                <div key={name} className="">
                  <label className="block text-gray-700 text-sm font-medium mb-2">{label}:</label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="border-2 border-gray-300 rounded-lg w-[300px] px-4 py-2 focus:outline-none focus:border-blue-500 transition duration-200"
                  />
                  {errors[name] && <div className="text-red-500 text-xs mt-1">{errors[name]}</div>}
                </div>
              ))}
            </div>
  
            {/* Row 2: Company Address 1 and 2 */}
      <div className='flex space-x-4'>
              {[
                { label: 'Company Address 1', name: 'companyAddress1' },
                { label: 'Company Address 2', name: 'companyAddress2' },
              ].map(({ label, name, type = 'text' }) => (
                <div key={name}>
                  <label className="block text-gray-700 text-sm font-medium mb-2">{label}:</label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="border-2 border-gray-300 rounded-lg w-[300px] h-[80px] px-4 py-2 focus:outline-none focus:border-blue-500 transition duration-200"
                  />
                  {errors[name] && <div className="text-red-500 text-xs mt-1">{errors[name]}</div>}
                </div>
              ))}
      </div>
  
            {/* Row 3: Phone Number and Email */}
            <div className="flex space-x-4">
              {[
                { label: 'Phone Number', name: 'phoneNumber', type: 'text' },
                { label: 'Email', name: 'email', type: 'email' },
              ].map(({ label, name, type }) => (
                <div key={name} className="">
                  <label className="block text-gray-700 text-sm font-medium mb-2">{label}:</label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="border-2 border-gray-300 rounded-lg w-[300px] px-4 py-2 focus:outline-none focus:border-blue-500 transition duration-200"
                  />
                  {errors[name] && <div className="text-red-500 text-xs mt-1">{errors[name]}</div>}
                </div>
              ))}
            </div>
  
            {/* Row 4: Password and Confirm Password */}
         <div className='flex space-x-4'>
              {[
                { label: 'Password', name: 'password', type: 'password' },
                { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block text-gray-700 text-sm font-medium mb-2">{label}:</label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="border-2 border-gray-300 rounded-lg w-[300px] px-4 py-2 focus:outline-none focus:border-blue-500 transition duration-200"
                  />
                  {errors[name] && <div className="text-red-500 text-xs mt-1">{errors[name]}</div>}
                </div>
              ))}
         </div>
  
            {/* Income Certificate */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Income Certificate (Optional):</label>
              <input
                type="file"
                name="incomeCertificate"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              />
            </div>
  
            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ${
                  !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  </div>
  
  );
}

export default SignUpPage;
