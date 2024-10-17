import React, { useState } from 'react';

function Resource() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [postalCodeError, setPostalCodeError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      // If no file is selected (e.g., the user cancels), clear the preview and image state
      setPreview(null);
      setImage(null);
      return;
    }

    setImage(file);

    // Preview the image
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Validate email format using regex
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

    // Validate postal code (must be a number with at least 4 digits)
    const postalCodeRegex = /^\d{4,}$/; // At least 4 digits
    if (value && !postalCodeRegex.test(value)) {
      setPostalCodeError('Postal code must be at least 4 digits');
    } else {
      setPostalCodeError('');
    }
  };

  // Handle form submission (just an example, you can modify it to submit to your API)
  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!image) {
    //   alert('Please select a photo to upload.');
    //   return;
    // }

    // Check for any validation errors before submission
    if (emailError || postalCodeError) {
      alert('Please fix the errors before submitting the form.');
      return;
    }

    // Use FormData to submit the form along with the image file
    const formData = new FormData();
    formData.append('photo', image);
    formData.append('email', email);
    formData.append('postalCode', postalCode);

    // Example submission (this would be replaced by your API call)
    console.log('Form submitted with image:', image);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex justify-between p-6 border shadow'>
        <div>
          <div className='text-[20px] font-medium'>General</div>

          <div className='flex gap-4'>
            <div className='mt-6'>
              <div className='text-[14px]'>First Name</div>
              <input type='text' className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'></input>
            </div>
            <div className='mt-6'>
              <div className='text-[14px]'>Last Name</div>
              <input type='text' className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'></input>
            </div>
          </div>

          <div className='flex gap-4'>
            <div className='mt-6'>
              <div className='text-[14px]'>Resource Key</div>
              <input type='text' className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'></input>
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
              <select type='text' className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Developer">Developer</option>
              </select>
            </div>
            <div className='mt-6'>
              <div className='text-[14px]'>Resource Manager</div>
              <select type='text' className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'>
                <option value="UI/UX Designer">Male</option>
                <option value="Developer">Female</option>
              </select>
            </div>
            <div className='mt-6'>
              <div className='text-[14px]'>Calendar</div>
              <input type='date' className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'></input>
            </div>
          </div>

          <div className='flex gap-10 mt-6'>
            <div className='flex gap-2'>
              <input type='radio' name='resourceType' value="External Resource"></input>
              <div>External Resource</div>
            </div>
            <div className='flex gap-2'>
              <input type='radio' name='resourceType' value="Part Time"></input>
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
            <input type='date' className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'></input>
          </div>
          <div className='mt-6'>
            <div className='text-[14px]'>Termination Date</div>
            <input type='date' className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'></input>
          </div>
        </div>

        <div className='flex gap-4'>
          <div className='mt-6'>
            <div className='text-[14px]'>Country</div>
            <select type='text' className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'>
              <option value="UI/UX Designer">India</option>
              <option value="Developer">UAE</option>
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
            <input type='text' className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'></input>
          </div>
        </div>

        <div className='flex gap-4'>
          <div className='mt-6'>
            <div className='text-[14px]'>Department</div>
            <select type='text' className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'>
              <option value="UI/UX Designer">Development</option>
              <option value="Developer">Marketing</option>
            </select>
          </div>
          <div className='mt-6'>
            <div className='text-[14px]'>Office</div>
            <input type='text' className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'></input>
          </div>
          <div className='mt-6'>
            <div className='text-[14px]'>Value Stream</div>
            <input type='text' className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'></input>
          </div>
          <div className='mt-6'>
            <div className='text-[14px]'>Skills</div>
            <input type='text' className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'></input>
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
