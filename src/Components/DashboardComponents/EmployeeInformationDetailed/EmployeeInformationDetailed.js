import React, { useState, useEffect, useContext } from 'react';
import { contextItems } from '../EmployeeInformation/EmployeeInformation';

const fieldOptions = {
  Gender: ['Male', 'Female', 'Other'],
  MaritalStatus: ['Single', 'Married', 'Divorced', 'Widow'],
  EmployeeType: ['Permanent', 'Contract'],
  EmploymentStatus: ['Active', 'Inactive'],
};

function EmployeeInformationDetailed({ onSubmit, employee, viewMode }) {
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
    ProfilePhoto: null, // Add profile photo to the form data
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const { setShowForm } = useContext(contextItems);

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const validateField = (name, value) => {
    if (!value && name !== 'ProfilePhoto') {
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
    const { name, value, files } = e.target;
    if (name === 'ProfilePhoto' && files[0]) {
      const photo = files[0];
      setFormData({ ...formData, ProfilePhoto: photo });
      setPhotoPreview(URL.createObjectURL(photo)); // Preview photo
    } else if (name === 'PhoneNumber' || name === 'EmergencyContactNumber') {
      const numericValue = value.replace(/\D/g, '');
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
    const isValid = Object.keys(formData).every((key) => formData[key] !== '');
    setIsFormValid(isValid && Object.values(errors).every((error) => !error));
  }, [formData, errors]);

  const handleBackClick = () => {
    setShowForm(false); // Hide the form and go back to the list
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-lg max-w-5xl mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-center">Employee Information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block">{key.replace(/([A-Z])/g, ' $1')}:</label>
            {fieldOptions[key] ? (
              <select
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className={`border w-full p-2 ${errors[key] ? 'border-red-500' : ''}`}
                disabled={viewMode} // Disable when in view mode
              >
                <option value="">Select {key.replace(/([A-Z])/g, ' $1')}</option>
                {fieldOptions[key].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              key === 'ProfilePhoto' ? (
                <>
                  <input
                    type="file"
                    name={key}
                    accept="image/*"
                    onChange={handleChange}
                    className={`border w-full p-2 ${errors[key] ? 'border-red-500' : ''}`}
                    disabled={viewMode} // Disable when in view mode
                  />
                  {photoPreview && (
                    <img
                      src={photoPreview}
                      alt="Profile Preview"
                      className="mt-2 w-32 h-32 object-cover rounded-full"
                    />
                  )}
                </>
              ) : (
                <input
                  type={key === 'DateOfBirth' || key === 'JoiningDate' ? 'date' : key === 'PersonalEmail' ? 'email' : 'text'}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  onKeyPress={key === 'PhoneNumber' || key === 'EmergencyContactNumber' ? handleKeyPress : null}
                  className={`border w-full p-2 ${errors[key] ? 'border-red-500' : ''}`}
                  disabled={viewMode} // Disable when in view mode
                />
              )
            )}
            {errors[key] && <span className="text-red-500">{errors[key]}</span>}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handleBackClick}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700"
        >
          Back
        </button>

        {!viewMode && (
          <button
            type="submit"
            className={`bg-[#141454] text-white px-6 py-2 rounded ${isFormValid ? 'hover:bg-[#353599]' : 'bg-[#9999a7] opacity-50 cursor-not-allowed'}`}
            disabled={!isFormValid}
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
}

export default EmployeeInformationDetailed;
