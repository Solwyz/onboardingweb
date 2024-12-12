import React, { useState } from 'react'
import tickIcon from '../../../../Assets/HrTas/check.svg';
import checkBox from '../../../../Assets/HrTas/checkBox.svg';
import unCheckBox from '../../../../Assets/HrTas/uncheckBox.svg';
import BackButton from './BackButton';
import NewProgressive from './NewProgressive';


function FinalDetailsForm({setShowFinalForm,showFinalForm}) {

    const [isAccept, setIsAccept] = useState(false)

    const handleCheckBoxClick = () => {
        setIsAccept(!isAccept)
    }

    const handleSubmit =()=> {
        console.log('form has submitted sucessfully')
    }
    

    return (
        <div className='mt-8'>
            
            <NewProgressive stage={"Final"}/>

            <div className='flex justify-start mt-6'>            
                <BackButton stateValue={setShowFinalForm}/>
            </div>

            <form className='border shadow mt-4 p-6 min-h-[770px]' onSubmit={handleSubmit}>
                <div className='text-[20px] font-medium mt-2'>Acceptence of Terms</div>
                <div className='text-[16px] font-light leading-6 mt-4 tracking-wide'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap</div>
                <div className='text-[20px] font-medium mt-8'>Licence</div>
                <div className='text-[16px] font-light leading-6 mt-4 tracking-wide'>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</div>

                <div className='mt-9 flex gap-2'>
                    <img className='cursor-pointer' src={isAccept ? checkBox : unCheckBox} onClick={handleCheckBoxClick}></img>
                    <div className='text-[14px]'>I accept the electronic saving of my data according to the privacy policy .</div>
                </div>

                <div className='mt-12'>
                    <button
                        type='submit'
                        className={`bg-[#2B2342] text-[#FFFFFF] text-[14px] px-8 py-4 rounded-lg ${!isAccept ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!isAccept}
                    >
                        Finish
                    </button>
                </div>

            </form>

        </div>
    )
}

export default FinalDetailsForm
