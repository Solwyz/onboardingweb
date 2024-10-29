import React from 'react'
import backArrow from '../../../../Assets/HrTas/keyboard_backspace.svg'

function BackButton({stateValue}) {
    const handleBack =()=> {
        stateValue(false)
        console.log(stateValue)
    }
    return (
        <div>
            <button className='flex gap-2 items-center rounded bg-[#2B2342] px-4 py-2' onClick={handleBack}>
                <img src={backArrow}></img>
                <div className='text-[14px] text-[#FFFFFF]'>Back</div>
            </button>
        </div>
    )
}

export default BackButton
