import React, { useState, useEffect } from 'react';
import dummyImg from '../../../../Assets/Superadmin/DummyImage.png';
import deleteIcon from '../../../../Assets/Superadmin/delete.svg';
import arrowIcon from '../../../../Assets/Superadmin/arrow.svg';

function Resource() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(dummyImg);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    postalCode: ''
  })

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    primaryRole: '',
    resourceManager: '',
    calendar: '',
    resourceType: '', // Not mandatory
    startDate: '',
    terminationDate: '', // Not mandatory
    postalCode: '',
    city: '',
    department: '',
    office: '',
    valueStream: '',
    skills: ''
  });

  useEffect(() => {
    // Check if all required fields are filled
    const {
      firstName,
      lastName,
      email,
      primaryRole,
      resourceManager,
      calendar,
      startDate,
      postalCode,
      city,
      department,
      office,
      valueStream,
      skills
    } = formData;

    const isValid =
      firstName &&
      lastName &&
      email &&
      primaryRole &&
      resourceManager &&
      calendar &&
      startDate &&
      postalCode &&
      city &&
      department &&
      office &&
      valueStream &&
      skills &&
      !errors.email &&
      !errors.postalCode;

    setIsFormValid(isValid); // Enable or disable submit button based on validation
  }, [formData, errors]);

  const validateEmail =(email)=> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const validatePostalCode =(postalCode)=> {
    const postalCodeRegex = /^[0-9]{6,}$/;
    return postalCodeRegex.test(postalCode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'email') {
      if(!validateEmail(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Invalid email address'
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: ''
        }));
      }
    }

    if (name === 'postalCode') {
      if (!validatePostalCode(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          postalCode: 'Postal code must be at least 6 digits'
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          postalCode: ''
        }));
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setPreview(dummyImg);
      setImage(null);
      return;
    }
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      // Submit form data
      const formSubmissionData = new FormData();

      for (let key in formData) {
        formSubmissionData.append(key, formData[key]);
      }

      if (image) {
        formSubmissionData.append('image', image);
      }

      for (let pair of formSubmissionData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      // console.log('Form Submitted:', formData);
    }
  };

  return (
    <div>
      <div className="flex text-[20px] font-normal mt-[24px]">
        <a href="#" className="text-[#498EF6]">Resource Pool</a>
        <img src={arrowIcon} className='ml-[10px]' alt="icon1" />
        <span className='ml-[8px]'>Resource</span>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button className="text-[#E94E4E] text-[14px] font-normal flex">
          <img src={deleteIcon} alt="icon2" />
          Delete Department
        </button>
        <button className="font-normal text-[16px] text-[#3003BB]">Back</button>
      </div>

      <form className='mt-6' onSubmit={handleSubmit}>
        <div className='flex justify-between p-6 border shadow'>
          <div>
            <div className='text-[20px] font-medium'>General</div>
            <div className='flex gap-4'>
              <div className='mt-6'>
                <div className='text-[14px]'>First Name</div>
                <input
                  type='text'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
                />
              </div>
              <div className='mt-6'>
                <div className='text-[14px]'>Last Name</div>
                <input
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
                />
              </div>
            </div>

            <div className='flex gap-4'>
              <div className='mt-6'>
                <div className='text-[14px]'>Resource Key</div>
                <input
                  type='text'
                  name='resourceKey'
                  value={formData.resourceKey}
                  onChange={handleInputChange}
                  className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
                />
              </div>
              <div className='mt-6'>
                <div className='text-[14px]'>Email</div>
                <input
                  type='text'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`border rounded mt-2 w-[247px] h-[48px] px-[17px] ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                  <div className='text-red-500 text-sm mt-1'>{errors.email}</div>
                )}
              </div>
            </div>

            <div className='flex gap-4'>
              <div className='mt-6'>
                <div className='text-[14px]'>Primary Role</div>
                <select
                  name='primaryRole'
                  value={formData.primaryRole}
                  onChange={handleInputChange}
                  className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
                >
                  <option value=''>Select Role</option>
                  <option value='UI/UX Designer'>UI/UX Designer</option>
                  <option value='Developer'>Developer</option>
                </select>
              </div>
              <div className='mt-6'>
                <div className='text-[14px]'>Resource Manager</div>
                <input
                  type='text'
                  name='resourceManager'
                  value={formData.resourceManager}
                  onChange={handleInputChange}
                  className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
                />
              </div>
              <div className='mt-6'>
                <div className='text-[14px]'>Calendar</div>
                <input
                  type='date'
                  name='calendar'
                  value={formData.calendar}
                  onChange={handleInputChange}
                  className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
                />
              </div>
            </div>

            <div className='flex gap-10 mt-6'>
              <div className='flex gap-2'>
                <input
                  type='radio'
                  name='resourceType'
                  value='External Resource'
                  onChange={handleInputChange}
                />
                <div>External Resource</div>
              </div>
              <div className='flex gap-2'>
                <input
                  type='radio'
                  name='resourceType'
                  value='Part Time'
                  onChange={handleInputChange}
                />
                <div>Part Time</div>
              </div>
            </div>
          </div>

          {/* image section */}
          <div>
            <div className=''>
              <div>
                {preview && (
                  <img
                    src={preview}
                    alt='Preview'
                    className='w-[180px] h-[180px] object-cover rounded border'
                  />
                )}
              </div>
              <label
                htmlFor='imageUpload'
                className='cursor-pointer rounded mt-2  flex items-center justify-center text-[12px] text-[#7386C3]'
              >
                {preview && image ? 'Change Photo' : 'Upload Photo'}
              </label>
              <input
                type='file'
                id='imageUpload'
                name='image'
                accept='image/*'
                onChange={handleImageChange}
                className='hidden'
              />
            </div>
          </div>

        </div>

        <div className='p-6 mt-6 border shadow'>
          <div className='text-[20px] font-medium'>Details</div>

          <div className='flex gap-4'>
            <div className='mt-6'>
              <div className='text-[14px]'>Start Date</div>
              <input
                type='date'
                name='startDate'
                value={formData.startDate}
                onChange={handleInputChange}
                className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
              />
            </div>
            <div className='mt-6'>
              <div className='text-[14px]'>Termination Date</div>
              <input
                type='date'
                name='terminationDate'
                value={formData.terminationDate}
                onChange={handleInputChange}
                className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
              />
            </div>
          </div>

          <div className='flex gap-4'>
            <div className='mt-6'>
              <div className='text-[14px]'>Postal Code</div>
              <input
                type='text'
                name='postalCode'
                value={formData.postalCode}
                onChange={handleInputChange}
                className={`border rounded mt-2 w-[247px] h-[48px] px-[17px] ${errors.postalCode ? 'border-red-500' : ''}`}
              />
              {errors.postalCode && (
                <div className='text-red-500 text-sm mt-1'>{errors.postalCode}</div>
              )}
            </div>
            <div className='mt-6'>
              <div className='text-[14px]'>City</div>
              <input
                type='text'
                name='city'
                value={formData.city}
                onChange={handleInputChange}
                className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
              />
            </div>

          </div>

          <div className='flex gap-4'>
            <div className='mt-6'>
              <div className='text-[14px]'>Department</div>
              <input
                type='text'
                name='department'
                value={formData.department}
                onChange={handleInputChange}
                className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
              />
            </div>
            <div className='mt-6'>
              <div className='text-[14px]'>Office</div>
              <input
                type='text'
                name='office'
                value={formData.office}
                onChange={handleInputChange}
                className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
              />
            </div>
            <div className='mt-6'>
              <div className='text-[14px]'>Value Stream</div>
              <input
                type='text'
                name='valueStream'
                value={formData.valueStream}
                onChange={handleInputChange}
                className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
              />
            </div>
            <div className='mt-6'>
              <div className='text-[14px]'>Skills</div>
              <input
                type='text'
                name='skills'
                value={formData.skills}
                onChange={handleInputChange}
                className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
              />
            </div>
          </div>

          <div className='flex justify-end mt-8'>
            <button
              type='submit'
              className={`w-[107px] h-[48px] rounded text-white bg-[#2B2342] ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!isFormValid}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Resource;
