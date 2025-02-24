import React, { useState } from 'react'
import tickIcon from '../../../../Assets/HrTas/check.svg';
import checkBox from '../../../../Assets/HrTas/checkBox.svg';
import unCheckBox from '../../../../Assets/HrTas/uncheckBox.svg';
import BackButton from './BackButton';
import NewProgressive from './NewProgressive';
import Api from '../../../../Services/Api';


const token = localStorage.getItem("token");


function FinalDetailsForm({ setShowFinalForm, showFinalForm, ids }) {

    const [isAccept, setIsAccept] = useState(false)

    const handleCheckBoxClick = () => {
        setIsAccept(!isAccept)
    }

    const handleSubmit = () => {
      
        console.log('form has submitted sucessfully')
        console.log('idsssss',ids)
        Api.post('api/employee', {
         
                 "email": "reshma@gmail.com",
                "name": "Reshma",
                "isActive": true,
                "basicDetails": {
                    "id": ids.basicId
                },
                "professionalDetails": {
                    "id": ids.profId
                },
                "salaryDetails": {
                    "id": ids.salaryId
                },
                "personDetails": {
                    "id": ids.PersonalId
                },
                "contactForm": {
                    "id": ids.contactID
                },
                "physical": {
                    "id": ids.physicalID
                },
                "active": true,
                "consent": true
            
          

        },  { 'Authorization': `Bearer ${token}` }


        ).then((response) => {
            console.log("final:", response);
          });

    }


    return (
        <div className='mt-8'>

            <NewProgressive stage={"Final"} />

            <div className='flex justify-start mt-6'>
                <BackButton stateValue={setShowFinalForm} />
            </div>

            <form className='border shadow mt-4 p-6 min-h-[770px]' onSubmit={handleSubmit}>
                <div className='text-[20px] font-medium mt-2'>Acceptence of Terms</div>
                <div className='text-[16px] font-light leading-6 mt-4 tracking-wide'>By using Medoc Pharmacy’s website or services, you agree to our terms and policies. We may update these terms without prior notice. Unauthorized use, reproduction, or modification is prohibited. Medoc Pharmacy provides information, not medical advice. Continued use implies acceptance of any changes. Discontinue use if you disagree.</div>
                <div className='text-[20px] font-medium mt-8'>Licence</div>
                <div className='text-[16px] font-light leading-6 mt-4 tracking-wide'>Medoc Pharmacy grants you a limited, non-exclusive, non-transferable license to access and use its website and services for personal, non-commercial purposes. You may not copy, modify, distribute, sell, or exploit any content without prior written permission.
                    All content, including text, images, trademarks, and software, is the property of Medoc Pharmacy or its licensors, protected by intellectual property laws. Unauthorized use may lead to legal action.
                    This license does not grant ownership of any content. Any misuse or violation of these terms will result in immediate termination of access. Medoc Pharmacy reserves the right to revoke or modify this license at any time without notice. By continuing to use our services, you agree to comply with these terms.</div>

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
