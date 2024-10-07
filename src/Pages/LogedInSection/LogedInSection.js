import React from 'react'
import Logout from "../../Assets/power-off-solid.svg"

function LogedInSection() {
  return (
    <div>
      <div className=' flex gap-3'>
        <div>Ruthin</div>
        <button className='border rounded-lg p-2'>logout</button>
      </div>
    </div>
  )
}

export default LogedInSection
