import React, { useState, useEffect } from 'react';
import CloseBtn from "../../../Assets/HrTas/close.svg";

function TimeSheetModal({ isOpen, onClose, onAdd }) {
  const initialFormData = {
    date: '',
    employeeName: 'Aswin Sabu', // Set a default employee name
    project: '',
    task: '',
    description: '',
    hour: 0,
    minute: 0,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      // Reset form to initial state when modal opens
      setFormData(initialFormData);
      setErrors({}); // Clear errors when modal opens
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.date.trim()) newErrors.date = 'Date is required.';
    if (!formData.employeeName.trim()) newErrors.employeeName = 'Employee name is required.';
    if (!formData.project.trim()) newErrors.project = 'Project name is required.';
    if (!formData.task.trim()) newErrors.task = 'Task is required.';
    const totalDuration = parseInt(formData.hour) * 60 + parseInt(formData.minute);
    if (totalDuration <= 0) {
      newErrors.duration = 'Total duration must be greater than zero.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDurationChange = (e) => {
    const { name, value } = e.target;
    // Ensure minute does not exceed 59
    if (name === 'minute' && value > 59) return;

    setFormData({ ...formData, [name]: parseInt(value) || 0 });
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAdd(formData); // Pass the form data to the parent component
      onClose(); // Close the modal after submission
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[834px] p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[16px] text-[#6C55B2] font-medium">Add your Time sheet</h2>
          <button onClick={onClose} className="text-[#232E42] text-[20px]">
            <img src={CloseBtn} alt="Close" />
          </button>
        </div>
        {/* Form Inputs */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-[14px] font-normal">
          <div>
            <label>Date</label>
            <input
              type="date"
              name="date"
              className={`border w-full p-2 rounded-md ${errors.date ? 'border-red-500' : ''}`}
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
          </div>
          <div>
            <label>Employee Name</label>
            <input
              type="text"
              name="employeeName"
              value={formData.employeeName}
              className={`border w-full p-2 rounded-md ${errors.employeeName ? 'border-red-500' : ''}`}
              readOnly
            />
            {errors.employeeName && <p className="text-red-500 text-sm">{errors.employeeName}</p>}
          </div>
          <div>
            <label>Project</label>
            <input
              type="text"
              name="project"
              placeholder="Project name"
              className={`border w-full p-2 rounded-md ${errors.project ? 'border-red-500' : ''}`}
              value={formData.project}
              onChange={handleChange}
            />
            {errors.project && <p className="text-red-500 text-sm">{errors.project}</p>}
          </div>
          <div>
            <label>Task</label>
            <input
              type="text"
              name="task"
              placeholder="Add text here"
              className={`border w-full p-2 rounded-md ${errors.task ? 'border-red-500' : ''}`}
              value={formData.task}
              onChange={handleChange}
            />
            {errors.task && <p className="text-red-500 text-sm">{errors.task}</p>}
          </div>
        </div>
        <div className="mb-4 text-[14px] font-normal">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Add description"
            className="border w-full p-2 rounded-md"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex mb-4 text-[14px] font-normal">
          <div className='mt-[25px]'>Duration</div>
          <div className="flex items-center gap-4 ml-6">
            <div>
              <div>
                <label>Hour</label>
              </div>
              <input
                type="number"
                name="hour"
                className="border w-16 p-2 rounded-md"
                min="0"
                value={formData.hour}
                onChange={handleDurationChange}
              />
            </div>
            <div>
              <div>
                <label>Minute</label>
              </div>
              <input
                type="number"
                name="minute"
                className="border w-16 p-2 rounded-md"
                min="0"
                value={formData.minute}
                onChange={handleDurationChange}
              />
            </div>
          </div>
          {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
        </div>
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="border px-4 py-2 rounded-md">Cancel</button>
          <button
            onClick={handleSubmit}
            className="bg-[#6C55B2] text-white px-4 py-2 rounded-md"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default TimeSheetModal;
