import React, { useState } from 'react'
import './EmployeeDetails.css'
import profilePic from '../../../../Assets/HrTas/employeeDetails/image.png'
import BasicDetails from './BasicDetails';
import ProffesionalDetails from './ProffesionalDetails';
import SalaryDetails from './SalaryDetails';
import PersonalDetails from './PersonalDetails';
import ContactDetails from './ContactDetails';
import PhysicalDetails from './PhysicalDetails';
import { useEffect } from 'react';

function EmployeeDetails({employee}) {

    const [toggleState, setToggleState] = useState('basic');

    const employeeInfo = employee;

    const toggleTab = (section) => {
        setToggleState(section);
    }

    const employeeData = {
        firstName: employee.basicDetails?.firstName,
        lastName: employee.basicDetails?.lastName,
        employeeId: employee.id,
        designation: employee.basicDetails?.designation?.name,
        location: employee.contactForm?.workAddress?.streetName,
        status: 'Active',
        nationality:employee.basicDetails?.nationality,
        dateOfBirth: employee.basicDetails?.dateOfBirth,
        panNumber: employee.basicDetails?.panNumber,
        passport: employee.basicDetails?.passport,
        department: employee.basicDetails?.department?.departmentName,
        email:employee.email,
        dateOfJoin: employee.professionalDetails?.dateOfJoining,
        endOfProbation: employee.professionalDetails?.endOfProbation,
        dateEffective: employee.professionalDetails?.effectiveDate,
        jobPosition:employee.basicDetails?.designation?.name,
        lineManager: 'Arjun',
        department:  employee.basicDetails?.department?.departmentName,
        branch: employee.professionalDetails?.branch?.name,
        level:employee.professionalDetails?.level?.name,
        jobType: employee.professionalDetails?.jobType,
        description: 'Web Development',
        leaveFlow: '',
        workday: '',
        holiday: employee.professionalDetails?.holidayCycle,
        basicSalary: employee.salaryDetails?.basicSalary,
        currentSalary: employee.salaryDetails?.currentSalary,
        nextReviewDate: '14/08/2024',
        earning: employee.salaryDetails?.earnings,
        deduction: employee.salaryDetails?.deductions,
        bonus: employee.salaryDetails?.bonus,
        epf: employee.salaryDetails?.epf,
        bankName:employee.salaryDetails?.bankName,
        bankAccount:employee.salaryDetails?.bankAccount,
        payPeriod: employee.salaryDetails?.payPeriod,
        method: employee.salaryDetails?.paymentMethod,
        martialStatus: employee.personalDetails?.maritalStatus,
        fatherName: employee.personalDetails?.fatherName,
        spouseName: '',
        primaryMobile: employee.contactForm?.primaryNumber,
        secondaryMobile: employee.contactForm?.secondaryNumber,
        primaryAddress: employee.contactForm?.permanentAddress?.streetName,
        primaryPincode: employee.contactForm?.permanentAddress?.pincode,
        primaryCity: employee.contactForm?.permanentAddress?.city,
        primaryState: employee.contactForm?.permanentAddress?.state,
        secondaryAddress: employee.contactForm?.temporaryAddress?.streetName,
        secondaryPincode: employee.contactForm?.temporaryAddress?.pincode,
        secondaryCity: employee.contactForm?.temporaryAddress?.city,
        secondaryState: employee.contactForm?.temporaryAddress?.state,
        emergencyFirstName:employee.contactForm?.emergencyContact?.firstName,
        emergencyLastName:employee.contactForm?.emergencyContact?.lastName ,
        emergencyRelationship:employee.contactForm?.emergencyContact?.relationship,
        emergencyContactNumber: employee.contactForm?.emergencyContact?.emergencyContact,
        height: employee.physical?.height,
        weight: employee.physical?.weight,
        bloodType: employee.physical?.bloodType,
        visionLeft: employee.physical?.leftVision,
        visionRight:employee.physical?.rightVision,
        hearingLeft: employee.physical?.leftHearing,
        hearingRight: employee.physical?.rightHearing
    }

    useEffect(() => {
        console.log('seleced..',employee)
    },[])

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
                                <td className='pl-6 text-[#696A70]'>{employeeData.branch}</td>
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