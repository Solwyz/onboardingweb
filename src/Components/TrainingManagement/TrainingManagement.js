import React, { useState } from "react";
import AddBtn from "../../Assets/HrTas/addIcon.svg";
import { useEffect } from "react";
import Api from "../../Services/Api";

function TrainingManagement() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [trainings, setTrainings] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        category: "",
        mode: "",
        duration: "",
        employee: "",
        description: "",
        startDate: "",
        endDate: "",

    });

    const token = localStorage.getItem('token');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, materials: [...e.target.files] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('triangFormdata', formData)
        Api.post('api/training', {
            "trainingName": formData.title,
            "trainingDescription": formData.description,
            "trainingDate": formData.startDate,
            "employee": {
                "id": formData.employee
            }
        }, {
            'Authorization': `Bearer ${token}`
        })
            .then(response => {
                if (response && response.data) {
                    console.log('training adding response', response)
                } else {
                    console.error('Failed to add training')
                }
            })
        setTrainings([...trainings, formData]);
        setFormData({
            title: "",
            location: "",
            category: "",
            mode: "",
            duration: "",
            employee: "",
            description: "",
            startDate: "",
            endDate: "",

        });
        closeModal();
    };

    useEffect(() => {
        Api.get('api/training', {
            'Authorization': `Bearer ${token}`
        })
            .then(response => {
                if (response && response.data) {
                    console.log('training resp', response.data.content)
                    setTrainings(response.data.content)
                } else {
                    console.error(response)
                }
            })

        Api.get('api/employee', {
            'Authorization': `Bearer ${token}`
        })
            .then(response => {
                if (response && response.data) {
                    setEmployees(response.data.content)
                    console.log('employeeeeee', response.data.content)
                } else {
                    console.error('Invalid response data:', response)
                    alert('Can not fetch Employees data. Please try again')
                }
            })
    }, [])


    return (
        <div className="h-full w-full p-6 bg-[#F9F9FB]">
            <div className="flex justify-between">
                <div className="mt-4 font-medium text-[20px]">Training Management</div>
                <button
                    className="border p-3 rounded-lg bg-[#2B2342] text-white font-medium flex items-center"
                    onClick={openModal}
                >
                    <img className="mr-2" src={AddBtn} alt="Add" /> Add Training
                </button>
            </div>

            {isModalOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-[500px] max-w-[90%]">
            <h2 className="text-[16px] font-medium mb-6 text-start">Add Training</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1">Training Title</label>
                        <input name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" type="text" required />

                        <label className="block mb-1 mt-3">Location (For offline training)</label>
                        <input name="location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded" type="text" />
                    </div>
                    <div>
                        <label className="block mb-1">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded text-[16px]" required>
                            <option value="">Select Category</option>
                            <option>Technical</option>
                            <option>Soft Skills</option>
                            <option>Compliance</option>
                        </select>

                        <label className="block mb-1 mt-3">Training Mode</label>
                        <select name="mode" value={formData.mode} onChange={handleChange} className="w-full p-2 border rounded text-[16px]" required>
                            <option value="">Select Training Mode</option>
                            <option>Online</option>
                            <option>Offline</option>
                            <option>Hybrid</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1">Duration</label>
                        <input name="duration" value={formData.duration} onChange={handleChange} className="w-full p-2 border rounded" type="text" required />
                    </div>
                    <div>
                        <label className="block mb-1">Add Employee</label>
                        <select name="employee" value={formData.employee} onChange={handleChange} className="w-full p-2 border rounded">
                            <option value=""></option>
                            {employees?.map((employee, index) => (
                                <option key={index} value={employee.id}>{employee.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block mb-1">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1">Start Date</label>
                        <input name="startDate" value={formData.startDate} onChange={handleChange} className="w-full p-2 border rounded" type="date" required />
                    </div>
                    <div>
                        <label className="block mb-1">End Date</label>
                        <input name="endDate" value={formData.endDate} onChange={handleChange} className="w-full p-2 border rounded" type="date" required />
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-4">
                    <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={closeModal}>Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-[#2B2342] text-white rounded">Save</button>
                </div>
            </form>
        </div>
    </div>
)}

            <div className="mt-8 bg-white h-svh">

                <table className="w-full border-collapse  border-gray-300">
                    <thead>
                        <tr className="bg-[#465062] ">
                            <th className=" p-4 text-start font-normal text-white rounded-tl-lg">Title</th>
                            <th className=" p-4 text-start font-normal text-white">Category</th>
                            <th className=" p-4 text-start font-normal text-white">Mode</th>
                            <th className=" p-4 text-start font-normal text-white">Duration</th>
                            <th className=" p-4 text-start font-normal text-white">Employee</th>
                            <th className=" p-4 text-start font-normal text-white">Start Date</th>
                            <th className=" p-4 text-start font-normal text-white rounded-tr-lg">End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainings.map((training, index) => (
                            <tr key={index} className="border">
                                <td className=" p-4">{training.name}</td>
                                {/* <td className=" p-4">{training.category}</td> */}
                                {/* <td className=" p-4">{training.mode}</td> */}
                                {/* <td className=" p-4">{training.duration}</td> */}
                                <td className=" p-4">{training.employee?.name}</td>
                                <td className=" p-4">{training.trainingDate}</td>
                                {/* <td className=" p-4">{training.endDate}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TrainingManagement;
