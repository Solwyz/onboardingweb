import React from 'react'

function Resource() {
  return (
    <form>
      <div className='flex justify-between p-6'>
        <div>
          <div className='text-[20px] font-medium'>General</div>

          <div className='flex gap-4'>
            <div className='mt-6'>
              <div className='text-[14px]'>First Name</div>
              <input type='text' className='border rounded mt-2 w-[247px] h-[48px]'></input>
            </div>
            <div className='mt-6'>
              <div className='text-[14px]'>Last Name</div>
              <input type='text' className='border rounded mt-2 w-[247px] h-[48px]'></input>
            </div>
          </div>

          <div className='flex gap-4'>
            <div className='mt-6'>
              <div className='text-[14px]'>Resource Key</div>
              <input type='text' className='border rounded mt-2 w-[247px] h-[48px]'></input>
            </div>
            <div className='mt-6'>
              <div className='text-[14px]'>Email</div>
              <input type='text' className='border rounded mt-2 w-[247px] h-[48px]'></input>
            </div>
          </div>

          <div className='flex gap-4'>
            <div className='mt-6'>
              <div className='text-[14px]'>Primary Role</div>
              <select type='text' className='border rounded mt-2 w-[247px] h-[48px]'>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Developer">Developer</option>
              </select>
            </div>
            <div className='mt-6'>
              <div className='text-[14px]'>Resource Manager</div>
              <select type='text' className='border rounded mt-2 w-[247px] h-[48px]'>
                <option value="UI/UX Designer">Male</option>
                <option value="Developer">Female</option>
              </select>
            </div>
            <div className='mt-6'>
              <div className='text-[14px]'>Calender</div>
              <input type='date' className='border rounded mt-2 w-[247px] h-[48px]'></input>
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
    </form>
  )
}

export default Resource
