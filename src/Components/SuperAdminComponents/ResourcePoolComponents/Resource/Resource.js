import React from 'react'

function Resource() {
  return (
    <form>
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
              <input type='text' className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'></input>
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
              <div className='text-[14px]'>Calender</div>
              <input type='date' className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'></input>
            </div>
          </div>

          <div className='flex gap-10 mt-6'>
            <div className='flex gap-2'>
              <input type='radio' value="External Resource"></input>
              <div>External Resource</div>
            </div>
            <div className='flex gap-2'>
              <input type='radio' value="External Resource"></input>
              <div>Part Time</div>
            </div>
          </div>

        </div>
        <div>foto</div>
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
            <input type='text' className='border rounded mt-2 w-[247px] h-[48px] px-[17px]'></input>
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
          <button className='w-[107px] h-[48px] rounded text-white bg-[#2B2342]'>Submit</button>
        </div>
      </div>

    </form>
  )
}

export default Resource
