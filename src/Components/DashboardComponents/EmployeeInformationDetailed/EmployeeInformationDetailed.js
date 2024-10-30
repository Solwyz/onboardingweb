import React, { useState, useEffect, useContext } from 'react';
import { contextItems } from '../EmployeeInformation/EmployeeInformation';
import image from '../../../Assets/hrm/account_circle.svg'
import PhotoUpload from '../../../Assets/hrm/photo_upload.svg'
import Dropdown from '../../../Assets/HrTas/drop-down-arrow.svg'

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
      Designation: '',
      Department: '',
      WorkLocation: '',
      PhoneNumber: ''
    });

    const [maxDate, setMaxDate] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const { setShowForm } = useContext(contextItems);
  const departments = ['HR', 'Development', 'Marketing', 'Sales'];

  useEffect(() => {
    const today = new Date();
        const year = today.getFullYear() - 18;
        const month = (`0${today.getMonth() + 1}`).slice(-2);
        const day = (`0${today.getDate()}`).slice(-2);
        setMaxDate(`${year}-${month}-${day}`);

        if (employee) {
          setFormData(employee); // Set form data if editing an existing employee
        } else {
          setFormData({
            EmployeeId: '',
            FirstName: '',
            LastName: '',
            Designation: '',
            Department: '',
            WorkLocation: '',
            PhoneNumber: ''
          }); // Reset form for adding new employee
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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const selectDepartment = (dept) => {
    handleChange({ target: { name: 'Department', value: dept } });
    setIsDropdownOpen(false);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  //   if (name === 'ProfilePhoto' && files[0]) {
  //     const photo = files[0];
  //     setFormData({ ...formData, ProfilePhoto: photo });
  //     setPhotoPreview(URL.createObjectURL(photo));
  //   } else if (name === 'PhoneNumber' || name === 'EmergencyContactNumber') {
  //     const numericValue = value.replace(/\D/g, '');
  //     setFormData({ ...formData, [name]: numericValue });
  //     setErrors({ ...errors, [name]: validateField(name, numericValue) });
  //   } else {
  //     setFormData({ ...formData, [name]: value });
  //     setErrors({ ...errors, [name]: validateField(name, value) });
  //   }
  // };

  const handleKeyPress = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
      setErrors({ ...errors, [e.target.name]: 'Please enter numbers only.' });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Submit form data to parent component
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const newErrors = Object.keys(formData).reduce((acc, key) => {
  //     acc[key] = validateField(key, formData[key]);
  //     return acc;
  //   }, {});
  //   if (Object.values(newErrors).every((error) => !error)) {
  //     onSubmit(formData);
  //   } else {
  //     setErrors(newErrors);
  //   }
  // };

  useEffect(() => {
    const requiredFields = [
      'EmployeeId', 'FirstName', 'LastName', 'Gender', 'DateOfBirth',
      'Nationality', 'MaritalStatus', 'BloodGroup', 'PersonalEmail',
      'PhoneNumber', 'EmergencyContactNumber', 'Address', 'Department',
      'Designation', 'JoiningDate', 'EmployeeType', 'ReportingManager',
      'TeamDivision', 'WorkLocation', 'EmploymentStatus'
    ];

    const isValid = requiredFields.every((field) => formData[field]) &&
      Object.values(errors).every((error) => !error);

    setIsFormValid(isValid);
  }, [formData, errors]);

  const handleBackClick = () => {
    setShowForm(false);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg mx-auto p-8 bg-white">
      <h2 className="text-[18px] font-normal mb-4">All employees</h2>
      <div className='flex justify-between'>
        <div>
          <div className="flex-1 gap-6 space-y-8">
            {/* Employee ID */}
            <div className='flex justify-between  columns-2'>
              <div className="col-span-1 h-fit">
                <label className="block mb-1 text-sm font-normal">Employee ID:</label>
                <input
                  type="text"
                  name="EmployeeId"
                  value={formData.EmployeeId}
                  onChange={handleChange}
                  className={`border w-[527px] h-[48px] p-2 text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg ${errors.EmployeeId ? 'border-red-500' : ''}`}
                  disabled={viewMode}
                />
                {errors.EmployeeId && <p className="text-red-500">{errors.EmployeeId}</p>}
              </div>
              {/* Profile Photo Section */}


            </div>

            {/* First Name and Last Name */}
            <div className="flex gap-6">
              <div>
                <label className="block mb-1 text-sm font-normal">First Name:</label>
                <input
                  type="text"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleChange}
                  className={`border w-[251px] h-[48px] p-2 text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg ${errors.FirstName ? 'border-red-500' : ''}`}
                  disabled={viewMode}
                />
                {errors.FirstName && <p className="text-red-500">{errors.FirstName}</p>}
              </div>
              <div>
                <label className="block mb-1 text-sm font-normal">Last Name:</label>
                <input
                  type="text"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleChange}
                  className={`border w-[251px] h-[48px] p-2 text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg ${errors.LastName ? 'border-red-500' : ''}`}
                  disabled={viewMode}
                />
                {errors.LastName && <p className="text-red-500">{errors.LastName}</p>}
              </div>
            </div>

            {/* Date of Birth, Nationality, and Gender */}
            <div className="flex gap-6">
              <div>
                <label className="block mb-1 text-sm font-normal">Date of Birth:</label>
                <input
                  type="date"
                  name="DateOfBirth"
                  value={formData.DateOfBirth}
                  onChange={handleChange}
                  max={maxDate}
                  className={`border w-[251px] h-[48px] p-2 text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg ${errors.DateOfBirth ? 'border-red-500' : ''}`}
                  disabled={viewMode}
                />
                {errors.DateOfBirth && <p className="text-red-500">{errors.DateOfBirth}</p>}
              </div>
              <div>
                <label className="block mb-1 text-sm font-normal">Nationality:</label>
                <input
                  type="text"
                  name="Nationality"
                  value={formData.Nationality}
                  onChange={handleChange}
                  className={`border w-[251px] h-[48px] p-2 text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg ${errors.Nationality ? 'border-red-500' : ''}`}
                  disabled={viewMode}
                />
                {errors.Nationality && <p className="text-red-500">{errors.Nationality}</p>}
              </div>
              <div>
                <label className="block mb-1 text-sm font-normal">Gender:</label>
                <select
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleChange}
                  className={`border w-[251px] h-[48px] p-2 text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg ${errors.Gender ? 'border-red-500' : ''}`}
                  disabled={viewMode}
                >
                  <option value="">Select Gender</option>
                  {fieldOptions.Gender.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.Gender && <p className="text-red-500">{errors.Gender}</p>}
              </div>
            </div>

            {/* Blood Group, Personal Email, and Marital Status */}
            <div className="flex gap-6">
              <div>
                <label className="block mb-1 text-sm font-normal">Blood Group:</label>
                <input
                  type="text"
                  name="BloodGroup"
                  value={formData.BloodGroup}
                  onChange={handleChange}
                  className={`border w-[251px] h-[48px] p-2 text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg ${errors.BloodGroup ? 'border-red-500' : ''}`}
                  disabled={viewMode}
                />
                {errors.BloodGroup && <p className="text-red-500">{errors.BloodGroup}</p>}
              </div>
              <div>
                <label className="block mb-1 text-sm font-normal">Personal Email:</label>
                <input
                  type="email"
                  name="PersonalEmail"
                  value={formData.PersonalEmail}
                  onChange={handleChange}
                  className={`border w-[251px] h-[48px] p-2 text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg ${errors.PersonalEmail ? 'border-red-500' : ''}`}
                  disabled={viewMode}
                />
                {errors.PersonalEmail && <p className="text-red-500">{errors.PersonalEmail}</p>}
              </div>
              <div>
                <label className="block mb-1 text-sm font-normal">Marital Status:</label>
                <select
                  name="MaritalStatus"
                  value={formData.MaritalStatus}
                  onChange={handleChange}
                  className={`border w-[251px] h-[48px] p-2 text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg ${errors.MaritalStatus ? 'border-red-500' : ''}`}
                  disabled={viewMode}
                >
                  <option className='text-[14px] text-red-50' value="">Select Marital Status</option>
                  {fieldOptions.MaritalStatus.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.MaritalStatus && <p className="text-red-500">{errors.MaritalStatus}</p>}
              </div>
            </div>

            {/* Phone Number and Emergency Contact Number */}
            <div className="flex gap-6">
              <div>
                <label className="block mb-1 text-sm font-normal">Phone Number:</label>
                <input
                  type="text"
                  name="PhoneNumber"
                  value={formData.PhoneNumber}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  className={`border w-[251px] h-[48px] p-2 text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg ${errors.PhoneNumber ? 'border-red-500' : ''}`}
                  disabled={viewMode}
                />
                {errors.PhoneNumber && <p className="text-red-500">{errors.PhoneNumber}</p>}
              </div>
              <div>
                <label className="block mb-1 text-sm font-normal">Emergency Contact Number:</label>
                <input
                  type="text"
                  name="EmergencyContactNumber"
                  value={formData.EmergencyContactNumber}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  className={`border w-[251px] h-[48px] p-2 text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg ${errors.EmergencyContactNumber ? 'border-red-500' : ''}`}
                  disabled={viewMode}
                />
                {errors.EmergencyContactNumber && <p className="text-red-500">{errors.EmergencyContactNumber}</p>}
              </div>
            </div>

            {/* Address */}
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-normal">Address:</label>
              <textarea
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                className={`border w-[526px] h-[202px] p-2 text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg ${errors.Address ? 'border-red-500' : ''}`}
                disabled={viewMode}
              />
              {errors.Address && <p className="text-red-500">{errors.Address}</p>}
            </div>

            {/* Department, Designation, and Joining Date */}
            <div className="flex gap-6">
              <div className="relative">
                <label className="block mb-1 text-sm font-normal">Department/Role</label>

                <div className="relative">
                  <input
                    type="text"
                    name="Department"
                    value={formData.Department}
                    onChange={handleChange}
                    className={`border w-[251px] h-[48px] py-[13px] px-4 text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg ${errors.Department ? 'border-red-500' : ''}`}
                    disabled={viewMode}
                    onClick={toggleDropdown} // Toggle dropdown on input click as well
                  />
                  <img
                    src={Dropdown}
                    alt="dropdown icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={toggleDropdown}
                  />
                </div>

                {errors.Department && <p className="text-red-500">{errors.Department}</p>}

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <ul className="absolute z-10 bg-white border text-[14px] font-normal rounded mt-1 w-[251px]">
                    {departments.map((dept, index) => (
                      <li
                        key={index}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => selectDepartment(dept)}
                      >
                        {dept}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
               <div>
                <label className="block mb-1 text-sm  font-normal">Designation:</label>
                <input
                  type="text"
                  name="Designation"
                  value={formData.Designation}
                  onChange={handleChange}
                  className={`border w-[251px] h-[48px] p-2 text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg ${errors.Designation ? 'border-red-500' : ''}`}
                  disabled={viewMode}
                />
                {errors.Designation && <p className="text-red-500">{errors.Designation}</p>}
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-normal">Joining Date:</label>
                <input
                  type="date"
                  name="JoiningDate"
                  value={formData.JoiningDate}
                  onChange={handleChange}
                  className={`border w-[251px] h-[48px] p-2 text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg ${errors.JoiningDate ? 'border-red-500' : ''}`}
                  disabled={viewMode}
                />
                {errors.JoiningDate && <p className="text-red-500">{errors.JoiningDate}</p>}
              </div>
            </div>

            {/* Employee Type, Reporting Manager, and Team Division */}
            <div className="flex gap-6">
              <div>
                <label className="block mb-1 text-sm font-normal">Employee Type:</label>
                <select
                  name="EmployeeType"
                  value={formData.EmployeeType}
                  onChange={handleChange}
                  className={`border w-[251px] h-[48px] p-2 text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg ${errors.EmployeeType ? 'border-red-500' : ''}`}
                  disabled={viewMode}
                >
                  <option value="">Select Employee Type</option>
                  {fieldOptions.EmployeeType.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.EmployeeType && <p className="text-red-500">{errors.EmployeeType}</p>}
              </div>
              <div>
                <label className="block mb-1 text-sm font-normal">Reporting Manager:</label>
                <input
                  type="text"
                  name="ReportingManager"
                  value={formData.ReportingManager}
                  onChange={handleChange}
                  className={`border w-[251px] h-[48px] p-2 text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg ${errors.ReportingManager ? 'border-red-500' : ''}`}
                  disabled={viewMode}
                />
                {errors.ReportingManager && <p className="text-red-500">{errors.ReportingManager}</p>}
              </div>
              <div>
                <label className="block mb-1 text-sm font-normal">Team Division:</label>
                <input
                  type="text"
                  name="TeamDivision"
                  value={formData.TeamDivision}
                  onChange={handleChange}
                  className={`border w-[251px] h-[48px] p-2 text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg ${errors.TeamDivision ? 'border-red-500' : ''}`}
                  disabled={viewMode}
                />
                {errors.TeamDivision && <p className="text-red-500">{errors.TeamDivision}</p>}
              </div>
            </div>

            {/* Work Location and Employment Status */}
            <div className="flex gap-6">
              <div>
                <label className="block mb-1 text-sm font-normal">Work Location:</label>
                <input
                  type="text"
                  name="WorkLocation"
                  value={formData.WorkLocation}
                  onChange={handleChange}
                  className={`border w-[251px] h-[48px] p-2 text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg ${errors.WorkLocation ? 'border-red-500' : ''}`}
                  disabled={viewMode}
                />
                {errors.WorkLocation && <p className="text-red-500">{errors.WorkLocation}</p>}
              </div>
              <div>
                <label className="block mb-1 text-sm font-normal">Employment Status:</label>
                <select
                  name="EmploymentStatus"
                  value={formData.EmploymentStatus}
                  onChange={handleChange}
                  className={`border w-[251px] h-[48px] p-2 text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg ${errors.EmploymentStatus ? 'border-red-500' : ''}`}
                  disabled={viewMode}
                >
                  <option value="">Select Employment Status</option>
                  {fieldOptions.EmploymentStatus.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.EmploymentStatus && <p className="text-red-500">{errors.EmploymentStatus}</p>}
              </div>
            </div>


          </div>

          <div className="flex justify-between mt-6">
            {/* <button
              type="button"
              onClick={handleBackClick}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700"
            >
              Back
            </button> */}
{/* 
            {!viewMode && (
        <button
          type="submit"
          className={`bg-[#2B2342] text-white px-6 py-2 rounded ${isFormValid ? 'hover:bg-[#353599]' : 'bg-[#9999a7] opacity-50 cursor-not-allowed'}`}
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          Submit
        </button>
      )} */}
      {!viewMode && (
          <button type="submit" 
          className={`bg-[#2B2342] text-[14px] font-normal text-white px-6 py-2 rounded-lg ${isFormValid ? 'hover:bg-[#353599]' : 'bg-[#9999a7] opacity-50 cursor-not-allowed'}`}>
            {employee ? 'Update Employee' : 'Submit'}
          </button>
        )}
          </div>

        </div>
        <div className='h-fit'>
          <div className="flex flex-col items-center w-fit">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Profile Preview"
                className="mb-2 w-[184px] h-[184px] object-cover"
              />
            ) : (
              <div className="mb-2 w-[184px] h-[184px] border border-dashed flex items-center justify-center bg-[#F5F5F5] text-gray-400">
                <span><img src={image} alt="" /></span>
              </div>
            )}

            <label htmlFor="photo-upload" className="mt-2 text-[#7386C3] text-[12px] font-normal flex cursor-pointer">
              <img className='mr-1' src={PhotoUpload} alt="" />
              Change photo
            </label>

            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>
        </div>
      </div>

    </form>
  );
}

export default EmployeeInformationDetailed;
