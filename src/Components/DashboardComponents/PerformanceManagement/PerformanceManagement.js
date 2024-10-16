import React, { useEffect, useState } from 'react';

function PerformanceManagement() {
    const [formData, setFormData] = useState({
        goalSetting: '',
        kpis: '',
        appraisalCycle: 'Quarterly',
        appraisalDate: '',
        appraiserName: '',
        feedback: '',
        overallRating: 1,
        actionPlan: '',
        trainingPlan: ''
    });

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const validateForm = () => {
        let formErrors = {};
        if (!formData.goalSetting) formErrors.goalSetting = 'Goal setting is required !';
        if (!formData.kpis) formErrors.kpis = 'KPIs are required !';
        if (!formData.appraisalCycle) formErrors.appraisalCycle = 'Appraisal Cycle is required !';
        if (!formData.appraisalDate) formErrors.appraisalDate = 'Appraisal Date is required !';
        if (!formData.appraiserName) formErrors.appraiserName = 'Appraiser Name is required !';
        if (!formData.feedback) formErrors.feedback = 'Feedback/Comments are required !';
        if (formData.overallRating < 1 || formData.overallRating > 10) formErrors.overallRating = 'Overall Rating must be between 1 and 10';
        if (!formData.actionPlan) formErrors.actionPlan = 'Action Plan is required !';
        if (!formData.trainingPlan) formErrors.trainingPlan = 'Training and Development Plans are required !';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    }

    useEffect(() => {
        const isFormComplete = validateForm();
        setIsFormValid(isFormComplete);
    },[formData])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        }, [formData]);
    };

    const handleSubmit = (e) => {
        
        if (validateForm()) {
            console.log(formData); 
        }
    };

    return (
        <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-4 text-center">Performance Management</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
               
                <div>
                    <label className="block font-semibold text-gray-700">Goal Setting</label>
                    <input
                        type="text"
                        name="goalSetting"
                        value={formData.goalSetting}
                        onChange={handleChange}
                        className="w-full mt-2 p-2 border rounded"
                    />
                    {/* {errors.goalSetting && <p className="text-red-500 text-sm">{errors.goalSetting}</p>} */}
                </div>

                
                <div>
                    <label className="block font-semibold text-gray-700">Key Performance Indicators (KPIs)</label>
                    <input
                        type="text"
                        name="kpis"
                        value={formData.kpis}
                        onChange={handleChange}
                        className="w-full mt-2 p-2 border rounded"
                    />
                    {/* {errors.kpis && <p className="text-red-500 text-sm">{errors.kpis}</p>} */}
                </div>

                
                <div>
                    <label className="block font-semibold text-gray-700">Appraisal Cycle</label>
                    <select
                        name="appraisalCycle"
                        value={formData.appraisalCycle}
                        onChange={handleChange}
                        className="w-full mt-2 p-2 border rounded"
                    >
                        <option value="Quarterly">Quarterly</option>
                        <option value="Yearly">Yearly</option>
                    </select>
                    {/* {errors.appraisalCycle && <p className="text-red-500 text-sm">{errors.appraisalCycle}</p>} */}
                </div>

                
                <div>
                    <label className="block font-semibold text-gray-700">Appraisal Date</label>
                    <input
                        type="date"
                        name="appraisalDate"
                        value={formData.appraisalDate}
                        onChange={handleChange}
                        className="w-full mt-2 p-2 border rounded"
                    />
                    {/* {errors.appraisalDate && <p className="text-red-500 text-sm">{errors.appraisalDate}</p>} */}
                </div>

                
                <div>
                    <label className="block font-semibold text-gray-700">Appraiser Name</label>
                    <input
                        type="text"
                        name="appraiserName"
                        value={formData.appraiserName}
                        onChange={handleChange}
                        className="w-full mt-2 p-2 border rounded"
                    />
                    {/* {errors.appraiserName && <p className="text-red-500 text-sm">{errors.appraiserName}</p>} */}
                </div>

                
                <div>
                    <label className="block font-semibold text-gray-700">Feedback/Comments</label>
                    <textarea
                        name="feedback"
                        value={formData.feedback}
                        onChange={handleChange}
                        className="w-full mt-2 p-2 border rounded"
                    />
                    {/* {errors.feedback && <p className="text-red-500 text-sm">{errors.feedback}</p>} */}
                </div>

                
                <div>
                    <label className="block font-semibold text-gray-700">Overall Performance Rating (1-10)</label>
                    <input
                        type="number"
                        name="overallRating"
                        value={formData.overallRating}
                        onChange={handleChange}
                        min="1"
                        max="10"
                        className="w-full mt-2 p-2 border rounded"
                    />
                    {/* {errors.overallRating && <p className="text-red-500 text-sm">{errors.overallRating}</p>} */}
                </div>

                
                <div>
                    <label className="block font-semibold text-gray-700">Action Plan for Improvement</label>
                    <textarea
                        name="actionPlan"
                        value={formData.actionPlan}
                        onChange={handleChange}
                        className="w-full mt-2 p-2 border rounded"
                    />
                    {/* {errors.actionPlan && <p className="text-red-500 text-sm">{errors.actionPlan}</p>} */}
                </div>

                
                <div>
                    <label className="block font-semibold text-gray-700">Training and Development Plans</label>
                    <textarea
                        name="trainingPlan"
                        value={formData.trainingPlan}
                        onChange={handleChange}
                        className="w-full mt-2 p-2 border rounded"
                    />
                    {/* {errors.trainingPlan && <p className="text-red-500 text-sm">{errors.trainingPlan}</p>} */}
                </div>

                
                <div className="text-center">
                    <button
                        type="submit"
                        className={`bg-blue-500 text-white px-6 py-2 rounded ${!isFormValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                            }`}
                        disabled={!isFormValid}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PerformanceManagement;
