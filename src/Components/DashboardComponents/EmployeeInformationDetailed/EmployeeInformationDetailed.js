import React, { useState } from 'react';

function EmployeeInformationDetailed() {
  const [formData, setFormData] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    nationality: '',
    maritalStatus: '',
    bloodGroup: '',
    personalEmail: '',
    phoneNumber: '',
    phoneNumbers: '',
    address: '',
    department: '',
    designation: '',
    joiningDate: '',
    employeeType: 'permanent',
    reportingManager: '',
    teamDivision: '',
    workLocation: '',
    employmentStatus: 'active',
    employeePhoto: null,
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';

    if (!value && name !== 'employeePhoto') {
      error = `${name.replace(/([A-Z])/g, ' $1')} is required.`;
    }

    if (name === 'phoneNumber' && value && !/^[0-9]*$/.test(value)) {
      error = 'Phone Number must contain only numbers.';
    }
    if (name === 'phoneNumbers' && value && !/^[0-9]*$/.test(value)) {
      error = 'Phone Number must contain only numbers.';
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, employeePhoto: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });

    if (Object.values(newErrors).every((error) => !error)) {
      console.log('Form data submitted:', formData);
      // Reset form after successful submission
      setFormData({
        employeeId: '',
        firstName: '',
        lastName: '',
        gender: '',
        dob: '',
        nationality: '',
        maritalStatus: '',
        bloodGroup: '',
        personalEmail: '',
        phoneNumber: '',
        phoneNumbers: '',
        address: '',
        department: '',
        designation: '',
        joiningDate: '',
        employeeType: 'permanent',
        reportingManager: '',
        teamDivision: '',
        workLocation: '',
        employmentStatus: 'active',
        employeePhoto: null,
      });
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='bg-gray-100 p-8 rounded-lg'>
      <h2 className='text-lg font-semibold mb-4'>Employee Information</h2>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block'>Employee ID:</label>
          <input
            type='text'
            name='employeeId'
            value={formData.employeeId}
            onChange={handleChange}
            className='border w-full p-2'
          />
          {errors.employeeId && <span className='text-red-500'>{errors.employeeId}</span>}
        </div>
        <div>
          <label className='block'>First Name:</label>
          <input
            type='text'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            className='border w-full p-2'
          />
          {errors.firstName && <span className='text-red-500'>{errors.firstName}</span>}
        </div>
        <div>
          <label className='block'>Last Name:</label>
          <input
            type='text'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            className='border w-full p-2'
          />
          {errors.lastName && <span className='text-red-500'>{errors.lastName}</span>}
        </div>
        <div>
          <label className='block'>Gender:</label>
          <select
            name='gender'
            value={formData.gender}
            onChange={handleChange}
            className='border w-full p-2'
          >
            <option value=''>Select</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </select>
          {errors.gender && <span className='text-red-500'>{errors.gender}</span>}
        </div>
        <div>
          <label className='block'>Date of Birth:</label>
          <input
            type='date'
            name='dob'
            value={formData.dob}
            onChange={handleChange}
            className='border w-full p-2'
          />
          {errors.dob && <span className='text-red-500'>{errors.dob}</span>}
        </div>
        <div>
          <label className='block'>Nationality:</label>
          <input
            type='text'
            name='nationality'
            value={formData.nationality}
            onChange={handleChange}
            className='border w-full p-2'
          />
          {errors.nationality && <span className='text-red-500'>{errors.nationality}</span>}
        </div>
        <div>
          <label className='block'>Marital Status:</label>
          <select
            name='maritalStatus'
            value={formData.maritalStatus}
            onChange={handleChange}
            className='border w-full p-2'
          >
            <option value=''>Select</option>
            <option value='single'>Single</option>
            <option value='married'>Married</option>
            <option value='divorced'>Divorced</option>
          </select>
          {errors.maritalStatus && <span className='text-red-500'>{errors.maritalStatus}</span>}
        </div>
        <div>
          <label className='block'>Blood Group:</label>
          <input
            type='text'
            name='bloodGroup'
            value={formData.bloodGroup}
            onChange={handleChange}
            className='border w-full p-2'
          />
          {errors.bloodGroup && <span className='text-red-500'>{errors.bloodGroup}</span>}
        </div>
        <div>
          <label className='block'>Personal Email:</label>
          <input
            type='email'
            name='personalEmail'
            value={formData.personalEmail}
            onChange={handleChange}
            className='border w-full p-2'
          />
          {errors.personalEmail && <span className='text-red-500'>{errors.personalEmail}</span>}
        </div>
        <div>
          <label className='block'>Phone Number:</label>
          <input
            type='text'
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleChange}
            className='border w-full p-2'
          />
          {errors.phoneNumber && <span className='text-red-500'>{errors.phoneNumber}</span>}
        </div>
        <div>
          <label className='block'>Alternative Phone Number:</label>
          <input
            type='text'
            name='phoneNumbers'
            value={formData.phoneNumbers}
            onChange={handleChange}
            className='border w-full p-2'
          />
          {errors.phoneNumbers && <span className='text-red-500'>{errors.phoneNumbers}</span>}
        </div>
        <div>
          <label className='block'>Address:</label>
          <input
            type='text'
            name='address'
            value={formData.address}
            onChange={handleChange}
            className='border w-full p-2'
          />
          {errors.address && <span className='text-red-500'>{errors.address}</span>}
        </div>
        <div>
          <label className='block'>Department:</label>
          <input
            type='text'
            name='department'
            value={formData.department}
            onChange={handleChange}
            className='border w-full p-2'
          />
          {errors.department && <span className='text-red-500'>{errors.department}</span>}
        </div>
        <div>
          <label className='block'>Designation:</label>
          <input
            type='text'
            name='designation'
            value={formData.designation}
            onChange={handleChange}
            className='border w-full p-2'
          />
          {errors.designation && <span className='text-red-500'>{errors.designation}</span>}
        </div>
        <div>
          <label className='block'>Joining Date:</label>
          <input
            type='date'
            name='joiningDate'
            value={formData.joiningDate}
            onChange={handleChange}
            className='border w-full p-2'
          />
          {errors.joiningDate && <span className='text-red-500'>{errors.joiningDate}</span>}
        </div>
        <div>
          <label className='block'>Employee Type:</label>
          <select
            name='employeeType'
            value={formData.employeeType}
            onChange={handleChange}
            className='border w-full p-2'
          >
            <option value='permanent'>Permanent</option>
            <option value='contract'>Contract</option>
            <option value='intern'>Intern</option>
          </select>
          {errors.employeeType && <span className='text-red-500'>{errors.employeeType}</span>}
        </div>
        <div>
          <label className='block'>Reporting Manager:</label>
          <input
            type='text'
            name='reportingManager'
            value={formData.reportingManager}
            onChange={handleChange}
            className='border w-full p-2'
          />
          {errors.reportingManager && <span className='text-red-500'>{errors.reportingManager}</span>}
        </div>
        <div>
          <label className='block'>Team/Division:</label>
          <input
            type='text'
            name='teamDivision'
            value={formData.teamDivision}
            onChange={handleChange}
            className='border w-full p-2'
          />
          {errors.teamDivision && <span className='text-red-500'>{errors.teamDivision}</span>}
        </div>
        <div>
          <label className='block'>Work Location:</label>
          <input
            type='text'
            name='workLocation'
            value={formData.workLocation}
            onChange={handleChange}
            className='border w-full p-2'
          />
          {errors.workLocation && <span className='text-red-500'>{errors.workLocation}</span>}
        </div>
        <div>
          <label className='block'>Employment Status:</label>
          <select
            name='employmentStatus'
            value={formData.employmentStatus}
            onChange={handleChange}
            className='border w-full p-2'
          >
            <option value='active'>Active</option>
            <option value='inactive'>Inactive</option>
          </select>
          {errors.employmentStatus && <span className='text-red-500'>{errors.employmentStatus}</span>}
        </div>
        <div>
          <label className='block'>Employee Photo:</label>
          <input
            type='file'
            name='employeePhoto'
            onChange={handleFileChange}
            className='border w-full p-2'
          />
          {errors.employeePhoto && <span className='text-red-500'>{errors.employeePhoto}</span>}
        </div>
      </div>
      <button type='submit' className='mt-4 p-2 bg-blue-500 text-white rounded'>
        Submit
      </button>
    </form>
  );
}

export default EmployeeInformationDetailed;
