import React, { useEffect, useState } from 'react';
import Api from '../../../Services/Api'; // Adjust the path based on your project structure
import Swal from 'sweetalert2';

function PerformanceManagement() {
    const initialFormData = {
        employeeName: '',
        goalSetting: '',
        kpis: '',
        appraisalCycle: '',
        appraisalDate: '',
        appraiserName: '',
        feedback: '',
        overallRating: '',
        actionPlan: '',
        trainingPlan: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [employees, setEmployees] = useState([]);

    const token = localStorage.getItem('token')
    const validateForm = () => {
        let formErrors = {};
        if (!formData.employeeName) formErrors.employeeName = 'Employee name is required!';
        if (!formData.goalSetting) formErrors.goalSetting = 'Goal setting is required!';
        if (!formData.kpis) formErrors.kpis = 'KPIs are required!';
        if (!formData.appraisalCycle) formErrors.appraisalCycle = 'Appraisal Cycle is required!';
        if (!formData.appraisalDate) formErrors.appraisalDate = 'Appraisal Date is required!';
        if (!formData.appraiserName) formErrors.appraiserName = 'Appraiser Name is required!';
        if (!formData.feedback) formErrors.feedback = 'Feedback/Comments are required!';
        if (formData.overallRating < 1 || formData.overallRating > 10) formErrors.overallRating = 'Overall Rating must be between 1 and 10';
        if (!formData.actionPlan) formErrors.actionPlan = 'Action Plan is required!';
        if (!formData.trainingPlan) formErrors.trainingPlan = 'Training and Development Plans are required!';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    useEffect(() => {
        const isFormComplete = validateForm();
        setIsFormValid(isFormComplete);
    }, [formData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        console.log('qqq', formData)
        e.preventDefault();
        setIsSubmitted(true);
        if (validateForm()) {

            Api.post('api/performance', {
                "employee": {
                    "id": formData.employeeName
                },
                "rating": formData.overallRating,
                "feedback": formData.feedback,
                "reviewDate": formData.appraisalDate,
                "period": formData.appraisalCycle
            },{'Authorization': `Bearer ${token}`})
            .then(response => {
                if(response && response.data){
                    setFormData(initialFormData)
                    console.log('performanceform',response.data)
                   Swal.fire({
                        icon: 'success',
                        title: 'Performance form submitted',
                        text: 'Performance form has been submitted successfully!',
                        confirmButtonColor: '#2B2342'
                    });
                } else {
                    console.log('Invalid responce data', response)
                    alert('Performance form not submitted. Please try again.')
                }
            })

            // try {
            //     const response = await Api.post('api/employee', formData,
            //         {
            //             'Authorization': `Bearer ${token}`

            //         })
            //     console.log('neww', response)
            //     if (response?.status === 200 || response?.status === 201) {
            //         alert('Performance details submitted successfully!');
            //         setFormData(initialFormData); // Reset the form
            //     } else {
            //         alert('Failed to submit performance details. Please try again.');
            //     }
            // } catch (error) {
            //     console.error('Error submitting performance details:', error);
            //     alert('An error occurred while submitting the form. Please try again later.');
            // }
            setIsSubmitted(false);
        }
    };

    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        Api.get('api/employee/api/employees/active', {
            'Authorization': `Bearer ${token}`
        })
            .then(response => {
                if (response && response.data) {
                    setEmployees(response.data)
                    console.log('peformance employeeeeee', response.data)
                } else {
                    console.error('Invalid response data:', response)
                    alert('Can not fetch Employees data. Please try again')
                }
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    return (
        <div className="p-6">
            <h2 className="text-xl font-medium text-[#232E42] mt-10">Performance Management</h2>
            <div className="container p-6 bg-white mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className=''>
                        <label className="block text-[#373737] text-sm font-normal">Employee Name</label>
                        <select
                            name="employeeName"
                            value={formData.employeeName}
                            onChange={handleChange}
                            className="w-[251px] h-[48px] p-2 text-[#696A70] text-sm font-normal focus:outline-[#A4A4E5] mt-2 rounded-lg border-[#E6E6E7] border"
                        >
                            <option value="">Select employee</option>
                            {Array.isArray(employees) && employees.map((employee, index) => (
                                <option key={index} value={employee.id}>{employee.name}</option>
                            ))}
                        </select>
                        {isSubmitted && errors.employeeName && <p className="text-red-500 text-sm mt-1">{errors.employeeName}</p>}
                    </div>
                    <div className=''>
                        <label className="block text-[#373737] text-sm font-normal">Goal Setting</label>
                        <textarea
                            type="text"
                            name="goalSetting"
                            value={formData.goalSetting}
                            onChange={handleChange}
                            placeholder="Your Goal setting"
                            className="w-full h-[112px] p-4 text-[#696A70] text-sm font-normal focus:outline-[#A4A4E5] mt-2 rounded-lg  border border-[#E6E6E7]"
                        />
                        {isSubmitted && errors.goalSetting && <p className="text-red-500 text-sm mt-1">{errors.goalSetting}</p>}
                    </div>

                    <div className='mt-4'>
                        <label className="block text-[#373737] text-sm font-normal">Key Performance Indicators (KPI)</label>
                        <textarea
                            type="text"
                            name="kpis"
                            value={formData.kpis}
                            onChange={handleChange}
                            placeholder="Add here"
                            className="w-full h-[80px] p-4 text-[#696A70] text-sm font-normal focus:outline-[#A4A4E5] mt-2 rounded-lg border-[#E6E6E7] border "
                        />
                        {isSubmitted && errors.kpis && <p className="text-red-500 text-sm mt-1">{errors.kpis}</p>}
                    </div>

                    <div className='flex'>
                        <div className=''>
                            <label className="block text-[#373737] text-sm font-normal">Appraisal Cycle</label>
                            <select
                                name="appraisalCycle"
                                value={formData.appraisalCycle}
                                onChange={handleChange}
                                className="w-[251px] h-[48px] p-2 text-[#696A70] text-sm font-normal focus:outline-[#A4A4E5] mt-2 rounded-lg border-[#E6E6E7] border"
                            >
                                <option value="">Appraisal cycle</option>
                                <option value="MONTHLY">Monthly</option>
                            </select>
                            {isSubmitted && errors.appraisalCycle && <p className="text-red-500 text-sm mt-1">{errors.appraisalCycle}</p>}
                        </div>

                        <div className='ml-10'>
                            <label className="block text-[#373737] text-sm font-normal">Appraisal Date</label>
                            <input
                                type="date"
                                name="appraisalDate"
                                value={formData.appraisalDate}
                                min={today}
                                onChange={handleChange}
                                className="w-[251px] h-[48px] p-2 text-[#696A70] text-sm font-normal focus:outline-[#A4A4E5] mt-2 rounded-lg border-[#E6E6E7] border "
                            />
                            {isSubmitted && errors.appraisalDate && <p className="text-red-500 text-sm mt-1">{errors.appraisalDate}</p>}
                        </div>

                        <div className='ml-10'>
                            <label className="block text-[#373737] text-sm font-normal">Appraiser Name</label>
                            <input
                                type="text"
                                name="appraiserName"
                                value={formData.appraiserName}
                                onChange={handleChange}
                                placeholder="Appraiser Name"
                                className="w-[251px] h-[48px] p-2 text-[#696A70] text-sm font-normal focus:outline-[#A4A4E5] mt-2 rounded-lg border-[#E6E6E7] border"
                            />
                            {isSubmitted && errors.appraiserName && <p className="text-red-500 text-sm mt-1">{errors.appraiserName}</p>}
                        </div>
                    </div>

                    <div className='mt-4'>
                        <label className="block text-[#373737] text-sm font-normal">Feedback/Comments</label>
                        <textarea
                            name="feedback"
                            value={formData.feedback}
                            onChange={handleChange}
                            placeholder="Add your feedback / comments"
                            className="w-full h-[80px] p-4 text-[#696A70] text-sm font-normal focus:outline-[#A4A4E5] mt-2 rounded-lg border-[#E6E6E7] border"
                        />
                        {isSubmitted && errors.feedback && <p className="text-red-500 text-sm mt-1">{errors.feedback}</p>}
                    </div>

                    <div className='mt-4'>
                        <label className="block text-[#373737] text-sm font-normal">Overall Performance Rating (1-10)</label>
                        <input
                            type="number"
                            name="overallRating"
                            value={formData.overallRating}
                            onChange={handleChange}
                            placeholder="9.5"
                            min="1"
                            max="10"
                            className="w-[251px] h-[48px] p-4 text-[#696A70] text-sm font-normal focus:outline-[#A4A4E5] mt-2 rounded-lg border-[#E6E6E7] border"
                        />
                        {isSubmitted && errors.overallRating && <p className="text-red-500 text-sm mt-1">{errors.overallRating}</p>}
                    </div>

                    <div className='mt-4'>
                        <label className="block text-[#373737] text-sm font-normal">Action Plan for Improvement</label>
                        <textarea
                            name="actionPlan"
                            value={formData.actionPlan}
                            onChange={handleChange}
                            placeholder="Add action plan"
                            className="w-full h-[80px] p-4 text-[#696A70] text-sm font-normal focus:outline-[#A4A4E5] mt-2 rounded-lg border-[#E6E6E7] border"
                        />
                        {isSubmitted && errors.actionPlan && <p className="text-red-500 text-sm mt-1">{errors.actionPlan}</p>}
                    </div>

                    <div className='mt-4'>
                        <label className="block text-[#373737] text-sm font-normal">Training and Development Plans</label>
                        <textarea
                            name="trainingPlan"
                            value={formData.trainingPlan}
                            onChange={handleChange}
                            placeholder="Add training and development plans"
                            className="w-full h-[80px] p-4 text-[#696A70] text-sm font-normal focus:outline-[#A4A4E5] mt-2 rounded-lg border-[#E6E6E7] border"
                        />
                        {isSubmitted && errors.trainingPlan && <p className="text-red-500 text-sm mt-1">{errors.trainingPlan}</p>}
                    </div>
                    <div className="mt-[56px]">
                        <button
                            type="submit"
                            className={`bg-[#2B2342] text-white text-[14px] font-normal py-2 px-6 rounded-lg ${isFormValid ? "" : "opacity-50 cursor-not-allowed"}`}
                            disabled={!isFormValid}
                        >
                            Apply
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PerformanceManagement;
