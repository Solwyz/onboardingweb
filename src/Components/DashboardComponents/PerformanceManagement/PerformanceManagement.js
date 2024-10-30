import React, { useEffect, useState } from 'react';

function PerformanceManagement() {
    const initialFormData = {
        goalSetting: '',
        kpis: '',
        appraisalCycle: '',
        appraisalDate: '',
        appraiserName: 'Vinay Sharma',
        feedback: '',
        overallRating: '',
        actionPlan: '',
        trainingPlan: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = () => {
        let formErrors = {};
        if (!formData.goalSetting) formErrors.goalSetting = 'Goal setting is required!';
        if (!formData.kpis) formErrors.kpis = 'KPIs are required!';
        if (!formData.appraisalCycle) formErrors.appraisalCycle = 'Appraisal Cycle is required!';
        if (!formData.appraisalDate) formErrors.appraisalDate = 'Appraisal Date is required!';
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        if (validateForm()) {
            console.log(formData);
            setFormData(initialFormData);
            setErrors({});
            setIsSubmitted(false);
        }
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="p-6">
            <h2 className="text-xl font-medium text-[#232E42]  mt-10 ">Performance Management</h2>

            <div className='container p-6 bg-white mt-6'>
                <form onSubmit={handleSubmit} className="space-y-6">

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
                                <option value="Quarterly">Quarterly</option>
                                <option value="Yearly">Yearly</option>
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
                                value="Vinay Sharma"
                                readOnly
                                className="w-[251px] h-[48px] p-2 text-[#696A70] text-sm font-normal focus:outline-[#A4A4E5] mt-2 rounded-lg border-[#E6E6E7] border"
                            />
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
                            disabled={!isFormValid} // Disabled if form is not valid
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
