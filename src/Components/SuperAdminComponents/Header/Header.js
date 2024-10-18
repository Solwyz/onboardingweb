import React from 'react'
import Logo from "../../../Assets/44 1.svg"
import Notification from "../../../Assets/Group 2.svg"
import Announce from "../../../Assets/Group 3.svg"
import User from "../../../Assets/Frame.svg"
 
function Header() {
  return (
    <div className=' h-[72px] z-[1000] pl-[40px] pr-[25px] flex items-center '>
    <img className='cursor-pointer' src={Logo} alt="" />
    <div className='flex justify-end ml-auto'>
    <img className='cursor-pointer' src={Notification} alt="" />
    <img className='ml-4 cursor-pointer' src={Announce} alt="" />
    <img className='ml-16 cursor-pointer' src={User} alt="" />
    </div>
 
    </div>
  )
}
 
export default Header