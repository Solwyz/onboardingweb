import React, { useState } from 'react'
import './EmployeeDetails.css'
import profilePic from '../../../../Assets/HrTas/employeeDetails/image.png'
import BasicDetails from './BasicDetails';
import ProffesionalDetails from './ProffesionalDetails';
import SalaryDetails from './SalaryDetails';
import PersonalDetails from './PersonalDetails';
import ContactDetails from './ContactDetails';
import PhysicalDetails from './PhysicalDetails';

function EmployeeDetails() {

    const [toggleState, setToggleState] = useState('basic');

    const toggleTab = (section) => {
        setToggleState(section);
    }

    const employeeData = {
        firstName: 'Affan',
        lastName: 'Muhammed',
        employeeId: 'ASJH7894',
        designation: 'Web Developer',
        location: 'Dubai',
        status: 'Active',
        nationality: 'Indian',
        dateOfBirth: '24/01/1999',
        panNumber: 'AHkysj4515',
        passport: '484950515254',
        department: 'Development',
        email: 'affanmuhammed@gmail.com',
        dateOfJoin: '7/06/2023',
        endOfProbation: '25/08/2023',
        dateEffective: '25/08/2023',
        jobPosition: 'Developer',
        lineManager: 'Arjun',
        department: 'Web',
        branch: 'Technical',
        level: '1',
        jobType: 'Full time',
        description: 'Web Development',
        leaveFlow: '',
        workday: '',
        holiday: 'Not Available',
        basicSalary: '15000',
        currentSalary: '16000',
        nextReviewDate: '14/08/2024',
        earning: '12224',
        deduction: '41200',
        bonus: '4500',
        epf: '10000',
        bankName: 'SBT',
        bankAccount: '30495052525354',
        payPeriod: 'Monthly',
        method: 'Net Banking',
        martialStatus: 'Single',
        fatherName: 'Anwar',
        spouseName: '',
        primaryMobile: '9848468281',
        secondaryMobile: '8268929134',
        primaryAddress: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar',
        primaryPincode: '695846',
        primaryCity: 'Trivandrum',
        primaryState: 'Kerala',
        secondaryAddress: 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar',
        secondaryPincode: '695846',
        secondaryCity: 'Trivandrum',
        secondaryState: 'Kerala',
        emergencyFirstName: 'John',
        emergencyLastName: 'Abraham',
        emergencyRelationship: 'Brother',
        emergencyContactNumber: '9628818284',
        height: '178cm',
        weight: '85kg',
        bloodType: 'O+ve',
        visionLeft: '20/20',
        visionRight: '20/20',
        hearingLeft: '15-Db',
        hearingRight: '15-Db'
    }
    return (
        <div className='m-6 flex  gap-4'>

            <div className=' bg-white w-[320px] min-h-[863px] shadow'>
                <div className='p-4'>
                    <img className='h-[275px] w-[288px] rounded' src={profilePic}></img>
                    <table className='mt-6'>
                        <tbody className='w-full space-y-4'>
                            <tr className='h-7'>
                                <td className='text-[#373737]'>Name</td>
                                <td className='pl-5'>:</td>
                                <td className='pl-6 text-[#696A70]'>{employeeData.firstName + ' ' + employeeData.lastName}</td>
                            </tr>
                            <tr className='h-7'>
                                <td className='text-[#373737]'>Employee ID</td>
                                <td className='pl-5'>:</td>
                                <td className='pl-6 text-[#696A70]'>{employeeData.employeeId}</td>
                            </tr>
                            <tr className='h-7'>
                                <td className='text-[#373737]'>Designation</td>
                                <td className='pl-5'>:</td>
                                <td className='pl-6 text-[#696A70]'>{employeeData.designation}</td>
                            </tr>
                            <tr className='h-7'>
                                <td className='text-[#373737]'>Location</td>
                                <td className='pl-5'>:</td>
                                <td className='pl-6 text-[#696A70]'>{employeeData.location}</td>
                            </tr>
                            <tr className='h-7'>
                                <td className='text-[#373737]'>Status</td>
                                <td className='pl-5'>:</td>
                                <td className='pl-6 font-medium text-[#03D217]'>{employeeData.status}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


            <div className='bg-white w-3/4 min-h-[863px] shadow'>

                <table className='w-full'>
                    <thead>
                        <tr className='h-12 text-center text-[#969696] border-b'>
                            <td className={toggleState === 'basic' ? 'border-b-4 border-[#857BA3] cursor-pointer w-1/6' : 'cursor-pointer w-1/6'} onClick={() => toggleTab('basic')}>Basic</td>
                            <td className={toggleState === 'proffesional' ? 'border-b-4 border-[#857BA3] cursor-pointer w-1/6' : 'cursor-pointer w-1/6'} onClick={() => toggleTab('proffesional')}>Proffesional</td>
                            <td className={toggleState === 'salary' ? 'border-b-4 border-[#857BA3] cursor-pointer w-1/6' : 'cursor-pointer w-1/6'} onClick={() => toggleTab('salary')}>Salary</td>
                            <td className={toggleState === 'personal' ? 'border-b-4 border-[#857BA3] cursor-pointer w-1/6' : 'cursor-pointer w-1/6'} onClick={() => toggleTab('personal')}>Personal</td>
                            <td className={toggleState === 'contact' ? 'border-b-4 border-[#857BA3] cursor-pointer w-1/6' : 'cursor-pointer w-1/6'} onClick={() => toggleTab('contact')}>Contact</td>
                            <td className={toggleState === 'physical' ? 'border-b-4 border-[#857BA3] cursor-pointer w-1/6' : 'cursor-pointer w-1/6'} onClick={() => toggleTab('physical')}>Physical</td>
                            {/* <td className={toggleState === 'final' ? 'border-b-4 border-[#857BA3] cursor-pointer' : 'cursor-pointer'} onClick={() => toggleTab('final')}>Final</td> */}
                        </tr>
                    </thead>
                </table>

                <div className='pt-8 px-6'>
                    <div className={toggleState === 'basic' ? 'content active-content' : 'content'}><BasicDetails employeeDetails={employeeData} /></div>
                    <div className={toggleState === 'proffesional' ? 'content active-content' : 'content'}><ProffesionalDetails employeeDetails={employeeData} /></div>
                    <div className={toggleState === 'salary' ? 'content active-content' : 'content'}><SalaryDetails employeeDetails={employeeData} /></div>
                    <div className={toggleState === 'personal' ? 'content active-content' : 'content'}><PersonalDetails employeeDetails={employeeData} /></div>
                    <div className={toggleState === 'contact' ? 'content active-content' : 'content'}><ContactDetails employeeDetails={employeeData} /></div>
                    <div className={toggleState === 'physical' ? 'content active-content' : 'content'}><PhysicalDetails employeeDetails={employeeData} /></div>
                    {/* <div className={toggleState === 'final' ? 'content active-content' : 'content'}>Final Details here</div> */}
                </div>

            </div>
        </div>
    )
}

export default EmployeeDetails