import React, { useState, useEffect } from 'react';
import dummyImg from '../../../../Assets/Superadmin/DummyImage.png'
import deleteIcon from '../../../../Assets/Superadmin/delete.svg';
import arrowIcon from '../../../../Assets/Superadmin/arrow.svg';
import ResourceList from './ResourceList';

function Resource({onBack}) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [postalCodeError, setPostalCodeError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    resourceKey: '',
    primaryRole: 'UI/UX Designer',
    resourceManager: '',
    calendar: '',
    resourceType: '',
    startDate: '',
    terminationDate: '',
    country: 'India',
    city: '',
    department: 'Development',
    office: '',
    valueStream: '',
    skills: ''
  });

 

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

  useEffect(() => {
    setPreview(dummyImg);
  }, []);


  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handlePostalCodeChange = (e) => {
    const value = e.target.value;
    setPostalCode(value);
    const postalCodeRegex = /^\d{4,}$/;
    if (value && !postalCodeRegex.test(value)) {
      setPostalCodeError('Postal code must be at least 4 digits');
    } else {
      setPostalCodeError('');
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    
    if (emailError || postalCodeError) {
      alert('Please fix the errors before submitting the form.');
      return;
    }
    
    const dataToSubmit = {
      ...formData,
      email,
      postalCode,
      image: image ? image.name : 'No image selected',
    };
    
    // Retrieve any existing data from localStorage
    const existingData = JSON.parse(localStorage.getItem('resourceData')) || [];
    
    // Add new data to the existing data array
    const updatedData = [...existingData, dataToSubmit];
    
    // Save the updated data array to localStorage
    localStorage.setItem('resourceData', JSON.stringify(updatedData));
    
    console.log('Form data saved:', dataToSubmit);
  };
  

 
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every((field) => field.trim() !== '') && email.trim() !== '' && postalCode.trim() !== '';
    const noErrors = !emailError && !postalCodeError;

    if (allFieldsFilled && noErrors) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formData, email, postalCode, emailError, postalCodeError]);

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
        <button 
          onClick={onBack}
          className="font-normal text-[16px] text-[#3003BB]">
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className='mt-4'>
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
                  onChange={handleFormChange}
                  className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
                />
              </div>
              <div className='mt-6'>
                <div className='text-[14px]'>Last Name</div>
                <input
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleFormChange}
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
                  onChange={handleFormChange}
                  className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
                />
              </div>
              <div className='mt-6'>
                <div className='text-[14px]'>Email</div>
                <input
                  type='text'
                  value={email}
                  onChange={handleEmailChange}
                  className={`border rounded mt-2 w-[247px] h-[48px] px-[17px] ${emailError ? 'border-red-500' : ''}`}
                />
                {emailError && <div className='text-red-500 text-sm'>{emailError}</div>}
              </div>
            </div>

            <div className='flex gap-4'>
              <div className='mt-6'>
                <div className='text-[14px]'>Primary Role</div>
                <select
                  name='primaryRole'
                  value={formData.primaryRole}
                  onChange={handleFormChange}
                  className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
                >
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
                  onChange={handleFormChange}
                  className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
                >
                </input>
              </div>
              <div className='mt-6'>
                <div className='text-[14px]'>Calendar</div>
                <input
                  type='date'
                  name='calendar'
                  value={formData.calendar}
                  onChange={handleFormChange}
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
                  onChange={handleFormChange}
                />
                <div>External Resource</div>
              </div>
              <div className='flex gap-2'>
                <input
                  type='radio'
                  name='resourceType'
                  value='Part Time'
                  onChange={handleFormChange}
                />
                <div>Part Time</div>
              </div>
            </div>
          </div>

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
                onChange={handleFormChange}
                className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
              />
            </div>
            <div className='mt-6'>
              <div className='text-[14px]'>Termination Date</div>
              <input
                type='date'
                name='terminationDate'
                value={formData.terminationDate}
                onChange={handleFormChange}
                className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
              />
            </div>
          </div>

          <div className='flex gap-4'>
            <div className='mt-6'>
              <div className='text-[14px]'>Postal Code</div>
              <input
                type='text'
                value={postalCode}
                onChange={handlePostalCodeChange}
                className={`border rounded mt-2 w-[247px] h-[48px] px-[17px] ${postalCodeError ? 'border-red-500' : ''}`}
              />
              {postalCodeError && <div className='text-red-500 text-sm'>{postalCodeError}</div>}
            </div>
            <div className='mt-6'>
              <div className='text-[14px]'>City</div>
              <input
                type='text'
                name='city'
                value={formData.city}
                onChange={handleFormChange}
                className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
              />
            </div>
          </div>

          <div className='flex gap-4'>
            <div className='mt-6'>
              <div className='text-[14px]'>Department</div>
              <select
                name='department'
                value={formData.department}
                onChange={handleFormChange}
                className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
              >
                <option value='Development'>Development</option>
                <option value='Marketing'>Marketing</option>
              </select>
            </div>
            <div className='mt-6'>
              <div className='text-[14px]'>Office</div>
              <input
                type='text'
                name='office'
                value={formData.office}
                onChange={handleFormChange}
                className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
              />
            </div>
            <div className='mt-6'>
              <div className='text-[14px]'>Value Stream</div>
              <input
                type='text'
                name='valueStream'
                value={formData.valueStream}
                onChange={handleFormChange}
                className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
              />
            </div>
            <div className='mt-6'>
              <div className='text-[14px]'>Skills</div>
              <input
                type='text'
                name='skills'
                value={formData.skills}
                onChange={handleFormChange}
                className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
              />
            </div>
          </div>

          <div className='flex justify-end mt-8'>
            <button
              type='submit'
              className={`w-[107px] h-[48px] rounded text-white ${isFormValid ? 'bg-[#2B2342]' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={!isFormValid}
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      {/* <ResourceList/> */}

    </div>
  );
}

export default Resource;
