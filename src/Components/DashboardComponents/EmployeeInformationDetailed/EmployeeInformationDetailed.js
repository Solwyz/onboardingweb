import React, { useState, useEffect, useContext } from 'react';
import { contextItems } from '../EmployeeInformation/EmployeeInformation';
import image from '../../../Assets/hrm/account_circle.svg';
import PhotoUpload from '../../../Assets/hrm/photo_upload.svg';
import Dropdown from '../../../Assets/HrTas/drop-down-arrow.svg';
import Api from '../../../Services/Api';
import backArrow from '../../../Assets/HrTas/keyboard_backspace.svg';
// import { useHistory } from 'react-router-dom';



const fieldOptions = {
  MaritalStatus: ['Single', 'Married', 'Divorced', 'Widow'],
  EmployeeType: ['Permanent', 'Contract'],
  EmploymentStatus: ['Active', 'Inactive'],
};

function EmployeeInformationDetailed({ onSubmit, employee, viewMode, initialData }) {
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    firstName: '',
    LastName: '',
    PersonalEmail: '',
    Department: '',
    Designation: '',
    WorkLocation: '',
    PhoneNumber: '',
    EmergencyContactNumber: '',
    Address: '',
    DateOfBirth: '',
    Nationality: '',
    gender: '',
    BloodGroup: '',
    MaritalStatus: '',
    EmployeeType: '',
    ReportingManager: '',
    TeamDivision: '',
    JoiningDate: '',
    EmploymentStatus: '',
  });

  const [maxDate, setMaxDate] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const { setShowForm } = useContext(contextItems);
  const [department, setDepartment] = useState([]);
  const [designation, setDesignation] = useState([]);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear() - 18;
    const month = (`0${today.getMonth() + 1}`).slice(-2);
    const day = (`0${today.getDate()}`).slice(-2);
    setMaxDate(`${year}-${month}-${day}`);

    if (initialData) {
      setFormData({
        firstName: initialData.basicDetails?.firstName || '',
        LastName: initialData.basicDetails?.lastName || '',
        PersonalEmail: initialData.email || '',
        Department: initialData.basicDetails?.department?.departmentName || '',
        Designation: initialData.basicDetails?.designation?.name || '',
        WorkLocation: initialData.contactForm?.workAddress?.streetName || '',
        Nationality: initialData.basicDetails?.nationality || '',
        gender: initialData.basicDetails?.gender || '',
        BloodGroup: initialData.physical?.bloodtype || '',
        MaritalStatus: initialData.personDetails?.maritalStatus || '',
        PhoneNumber: initialData.contactForm?.primaryNumber || '',
        EmergencyContactNumber: initialData.contactForm?.secondaryNumber || '',
        Address: initialData.contactForm?.permanentAddress || '',
        EmployeeType: initialData.EmployeeType || '',
        ReportingManager: initialData.ReportingManager || '',
        TeamDivision: initialData.TeamDivision || '',
        JoiningDate: initialData.JoiningDate || '',
        EmploymentStatus: initialData.EmploymentStatus || '',
      });
    }
  }, [employee, initialData]);

  const resetForm = () => {
    setFormData({
      firstName: '',
      LastName: '',
      PersonalEmail: '',
      Department: '',
      Designation: '',
      WorkLocation: '',
      PhoneNumber: '',
      EmergencyContactNumber: '',
      Address: '',
      DateOfBirth: '',
      Nationality: '',
      gender: '',
      BloodGroup: '',
      MaritalStatus: '',
      EmployeeType: '',
      ReportingManager: '',
      TeamDivision: '',
      JoiningDate: '',
      EmploymentStatus: '',
    });
    setErrors({});
  };

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
      return 'Enter a valid email address.';
    }
    return '';
  };

  useEffect(() => {
    const requiredFields = [
      'firstName', 'LastName', 'DateOfBirth', 'Nationality', 'gender', 'BloodGroup',
      'PersonalEmail', 'PhoneNumber', 'EmergencyContactNumber', 'Department',
      'Designation', 'WorkLocation', 'MaritalStatus', 'EmployeeType', 'JoiningDate',
      'ReportingManager', 'TeamDivision', 'EmploymentStatus'
    ];

    const isValid = requiredFields.every((field) => formData[field]) &&
      Object.values(errors).every((error) => !error);

    setIsFormValid(isValid);
    console.log('Form Data:', formData);
    console.log('Errors:', errors);
    console.log('Is Form Valid:', isValid);
  }, [formData, errors]);

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
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyPress = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
      setErrors({ ...errors, [e.target.name]: 'Please enter numbers only.' });
    }
  };

  const handleBackClick = () => {
    setShowForm(false);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    Api.post("api/employee",
      {
        email: formData.PersonalEmail,
        basicDetails:
        {
          firstName: formData.firstName,
          lastName: formData.LastName,
          dateOfBirth: formData.DateOfBirth,
          nationality: formData.Nationality,
          gender: formData.gender,
          department:{
            departmentName:formData.Department
          },
          designation:{
            name:formData.Designation
          }
        },
        physical: {
          bloodtype: formData.BloodGroup
        },
        personDetails:{
          maritalStatus:formData.MaritalStatus
        },
        contactForm:{
          primaryNumber:formData.PhoneNumber,
          emergencyContact:{
            emergencyContact:formData.EmergencyContactNumber
          },
          permanentAddress:{
            streetName:formData.Address
          },
          workAddress:{
            streetName:formData.WorkLocation
          }
        },
        professionalDetails:{
          dateOfJoining:formData.JoiningDate
        },
        EmployeeType:formData.EmployeeType,
        lineManager:formData.ReportingManager,
        TeamDivision:formData.TeamDivision,
        EmploymentStatus:formData.EmploymentStatus





      },
      {
        'Authorization': `Bearer ${token}`
      }

    ).then((response) => {
      console.log('add emppppzzzz',response);

    })
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
  };

  // const EmployeeInformation =()=>{
  //   const history = useHistory();
  //   const handleBackclick = ()=>{
  //     history.push('/hr')
  //   }
  // }

  useEffect(() => {
    Api.get('api/department', {
      'Authorization': `Bearer ${token}`
    })
      .then((response) => {
        console.log('wvwv:', response.data.content)
        setDepartment(response.data.content)
      })

    Api.get('api/designation', {
      'Authorization': `Bearer ${token}`
    })
      .then((response) => {
        console.log('bbbb', response)
        setDesignation(response.data.content);
      })


  }, []);

  return (
    <div>
      <div>

        <button
          className="flex gap-2 items-center rounded bg-[#2B2342] px-4 py-2"
          onClick={handleBackClick}
        >
          <img src={backArrow} alt="Back Arrow" />
          <div className="text-[14px] text-[#FFFFFF]">Back</div>
        </button>

      </div>
      <form onSubmit={handleSubmit} className="rounded-lg mx-auto p-8 mt-4 bg-white">

        <h2 className="text-[18px] font-normal mb-4 ">Add employees</h2>
        <div className='flex justify-between mt-8'>
          <div>
            <div className="flex-1 gap-6 space-y-8">
              {/* First Name and Last Name */}
              <div className="flex gap-6">
                <div>
                  <label className="block mb-1 text-sm font-normal">First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`border w-[251px] h-[48px] p-2 text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg ${errors.firstName ? 'border-red-500' : ''}`}
                    disabled={viewMode}
                  />
                  {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
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
                    name='gender'
                    value={formData.gender}
                    onChange={handleChange}
                    className='text-[14px] border rounded mt-2 w-[247px] h-[48px] px-[17px] focus:outline-[#A4A4E5]'
                  >
                    <option value=''>Select Gender</option>
                    <option value='MALE'>Male</option>
                    <option value='FEMALE'>Female</option>
                    <option value='OTHERS'>Others</option>
                  </select>
                  {errors.gender && <p className="text-red-500">{errors.gender}</p>}
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
                    <option value='SINGLE'>Single</option>
                    <option value='MARRIED'>Married</option>
                    <option value='DIVORCED'>Divorced</option>
                    <option value='WIDOW'>Widow</option>
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
                <div className="flex gap-4 text-[#373737]">
                  <div className="">
                    <div className="text-[14px]">Department</div>
                    <select
                      name="Department"
                      value={formData.Department}
                      onChange={handleChange}
                      className="text-[14px] border rounded-lg mt-2 w-[247px] h-[48px] px-[17px] focus:outline-[#A4A4E5]"
                    >
                      <option value="">Select Department</option>
                      {department.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.departmentName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <div className="">
                    <div className="text-[14px]">Designation</div>
                    <select
                      name="Designation"
                      value={formData.Designation}
                      onChange={handleChange}
                      className="text-[14px] border rounded-lg mt-2 w-[247px] h-[48px] px-[17px] focus:outline-[#A4A4E5]"
                    >
                      <option value="">Select Designation</option>
                      {designation.map((desig) => (
                        <option key={desig.id} value={desig.id}>
                          {desig.name}
                        </option>
                      ))}
                    </select>
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
                    <option value="PERMANENT">Permanent</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="INTERN">Intern</option>
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
              {!viewMode && (
                <button type="submit"
                  className={`bg-[#2B2342] text-[14px] font-normal text-white px-6 py-2 rounded-lg ${isFormValid ? 'hover:bg-[#353599]' : 'bg-[#9999a7] opacity-50 cursor-not-allowed'}`}
                  disabled={!isFormValid}
                >
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
                Upload photo
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
    </div>
  );
}

export default EmployeeInformationDetailed;