import React, { useState } from 'react';

function Resource() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [postalCodeError, setPostalCodeError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    resourceKey: '',
    primaryRole: 'UI/UX Designer',
    resourceManager: 'Male',
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
      setPreview(null);
      setImage(null);
      return;
    }

    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

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
    e.preventDefault();

    if (emailError || postalCodeError) {
      alert('Please fix the errors before submitting the form.');
      return;
    }

    const dataToSubmit = {
      ...formData,
      email,
      postalCode,
      image: image ? image.name : 'No image selected'
    };

    console.log('Form data:', dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit}>
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
              <select
                name='resourceManager'
                value={formData.resourceManager}
                onChange={handleFormChange}
                className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
              >
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
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
          <div className='mt-6'>
            <div className='text-[14px]'>Upload Photo</div>
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
            />
            {preview && (
              <img
                src={preview}
                alt='Preview'
                className='mt-4 w-[100px] h-[100px] object-cover'
              />
            )}
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
            <div className='text-[14px]'>Country</div>
            <select
              name='country'
              value={formData.country}
              onChange={handleFormChange}
              className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'
            >
              <option value='India'>India</option>
              <option value='UAE'>UAE</option>
            </select>
          </div>
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
          <button type='submit' className='w-[107px] h-[48px] rounded text-white bg-[#2B2342]'>Submit</button>
        </div>
      </div>
    </form>
  );
}

export default Resource;
