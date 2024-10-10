import React, { useState, useEffect, useContext } from 'react';
import { contextItems } from '../EmployeeInformation/EmployeeInformation';

const fieldOptions = {
  Gender: ['Male', 'Female', 'Other'],
  MaritalStatus: ['Single', 'Married', 'Divorced', 'Widow'],
  EmployeeType: ['Permanent', 'Contract'],
  EmploymentStatus: ['Active', 'Inactive'],
};

function EmployeeInformationDetailed({ onSubmit }) {
  const [formData, setFormData] = useState({
    EmployeeId: '',
    FirstName: '',
    LastName: '',
    Gender: '',
    DateOfBirth: '',
    Nationality: '',
    MaritalStatus: '',
    BloodGroup: '',
    PersonalEmail: '',
    PhoneNumber: '',
    EmergencyContactNumber: '',  
    Address: '',
    Department: '',
    TemporaryAddress: '',
    Designation: '',
    JoiningDate: '',
    EmployeeType: 'Permanent',
    ReportingManager: '',
    TeamDivision: '',
    WorkLocation: '',
    EmploymentStatus: 'Active',
    EmployeePhoto: null,
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const { setShowForm } = useContext(contextItems);

  const validateField = (name, value) => {
    if (!value && name !== 'EmployeePhoto') {
      return `${name.replace(/([A-Z])/g, ' $1')} is required.`;
    }
    if (name === 'PhoneNumber' || name === 'EmergencyContactNumber') {
      if (value && !/^\d{10}$/.test(value)) {
        return 'Must be exactly 10 digits.';
      }
    }
    if (name === 'PersonalEmail' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Enter a valid email address';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'PhoneNumber' || name === 'EmergencyContactNumber') {
      const numericValue = value.replace(/\D/g, ''); // Allow only digits
      setFormData({ ...formData, [name]: numericValue });
      setErrors({ ...errors, [name]: validateField(name, numericValue) });
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  const handleKeyPress = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
      setErrors({ ...errors, [e.target.name]: 'Please enter numbers only.' });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, EmployeePhoto: file });
    setErrors({ ...errors, EmployeePhoto: file ? '' : 'Employee photo is required.' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      acc[key] = validateField(key, formData[key]);
      return acc;
    }, {});
    if (Object.values(newErrors).every((error) => !error)) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    const isValid = Object.keys(formData).every((key) => {
      return (formData[key] !== '' || key === 'EmployeePhoto') && (key !== 'EmployeePhoto' || formData.EmployeePhoto !== null);
    });
    setIsFormValid(isValid && Object.values(errors).every((error) => !error));
  }, [formData, errors]);

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-lg max-w-5xl mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-center">Employee Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block">{key.replace(/([A-Z])/g, ' $1')}:</label>
            {fieldOptions[key] ? (
              <select name={key} value={formData[key]} onChange={handleChange} className="border w-full p-2">
                <option value="">Select {key.replace(/([A-Z])/g, ' $1')}</option>
                {fieldOptions[key].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type={key === 'DateOfBirth' || key === 'JoiningDate' ? 'date' : key === 'PersonalEmail' ? 'email' : 'text'}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                onKeyPress={key === 'PhoneNumber' || key === 'EmergencyContactNumber' ? handleKeyPress : null}
                className={`border w-full p-2 ${errors[key] ? 'border-red-500' : ''}`}
              />
            )}
            {errors[key] && <span className="text-red-500">{errors[key]}</span>}
          </div>
        ))}
        <div>
          <label className="block">Employee Photo:</label>
          <input type="file" name="EmployeePhoto" onChange={handleFileChange} className="w-full" />
          {formData.EmployeePhoto && <span>{formData.EmployeePhoto.name}</span>}
          {errors.EmployeePhoto && <span className="text-red-500">{errors.EmployeePhoto}</span>}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className={`bg-[#141454] text-white px-6 py-2 rounded ${isFormValid ? 'hover:bg-[#353599]' : 'bg-[#9999a7] opacity-50 cursor-not-allowed'}`}
          disabled={!isFormValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default EmployeeInformationDetailed;
