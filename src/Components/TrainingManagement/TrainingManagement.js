import React, { useState, useEffect } from "react";
import AddBtn from "../../Assets/HrTas/addIcon.svg";
import Api from "../../Services/Api";

function TrainingManagement() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
    const [trainings, setTrainings] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedEmpIds, setSelectedEmpIds] = useState([])
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        category: "",
        mode: "",
        duration: "",
        description: "",
        startDate: "",
        endDate: "",
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        Api.get('api/training', {
            'Authorization': `Bearer ${token}`
        }).then(response => {
            if (response?.data) {
                console.log(response.data.content);

                setTrainings(response.data.content);
            }
        });

        Api.get('api/employee', {
            'Authorization': `Bearer ${token}`
        }).then(response => {
            if (response?.data) {
                setEmployees(response.data.content);
            }
        });
    }, []);

    useEffect(() => {
        setSelectedEmpIds(selectedEmployees.map(emp => emp.id));
    }, [selectedEmployees])



    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openEmployeeModal = () => setIsEmployeeModalOpen(true);
    const closeEmployeeModal = () => setIsEmployeeModalOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEmployeeSelection = (employee) => {
        setSelectedEmployees((prev) =>
            prev.some(emp => emp.id === employee.id)
                ? prev.filter(emp => emp.id !== employee.id)
                : [...prev, employee]
        );

    };

    const saveSelectedEmployees = () => {
        closeEmployeeModal();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('zzzformdata', formData);
        console.log('selected emplss', selectedEmployees);
        console.log('new arrhy', selectedEmployees.map(emp => emp.id));
        Api.post('api/training', {
            trainingTitle: formData.title,
            trainingDescription: formData.description,
            startDate: formData.startDate,
            endDate: formData.endDate,
            category: formData.category,
            location: formData.location,
            trainingMode: formData.mode,
            duration: formData.duration,
            employees: selectedEmployees.map(emp => ({ id: emp.id }))

        },
            { 'Authorization': `Bearer ${token}` }
        ).then(response => {
            if (response?.data) {
                console.log('apires', response);
                setTrainings([...trainings, response.data]);
            }
        });
        setFormData({ title: "", location: "", category: "", mode: "", duration: "", description: "", startDate: "", endDate: "" });
        setSelectedEmployees([]);
        closeModal();
    };

    const removeSelectedEmployee = (employeeId) => {
        setSelectedEmployees(prev => prev.filter(emp => emp.id !== employeeId));
    };


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
                                    <input name="duration" value={formData.duration} onChange={handleChange} className="w-full p-2 border rounded" type="number" required />
                                </div>

                            </div>
                            <div>
                                <button onClick={openEmployeeModal}
                                    className="p-2 border rounded-md"
                                >Add Employee +</button>
                                {isEmployeeModalOpen && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                        <div className="bg-white p-6 rounded-lg w-[400px] max-w-[90%]">
                                            <h2 className="text-[16px] font-medium mb-6">Select Employees</h2>
                                            <ul className="max-h-60 overflow-y-auto">
                                                {employees.map((employee) => (
                                                    <li key={employee.id} className="flex justify-between p-2 border-b">
                                                        <span>{employee.name}</span>
                                                        <input type="checkbox" checked={selectedEmployees.some(emp => emp.id === employee.id)} onChange={() => handleEmployeeSelection(employee)} />
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="mt-2">
                                                <h3 className="text-[14px] font-medium">Selected Employees:</h3>
                                                <div className="flex flex-wrap gap-1">
                                                    {selectedEmployees.map(emp => <span key={emp.id} className="p-1 bg-gray-200 rounded mr-1">{emp.name}</span>)}
                                                </div>
                                            </div>
                                            <div className="flex justify-end mt-4">
                                                <button onClick={closeEmployeeModal} className="px-4 py-2 bg-gray-300 rounded mr-2">Cancel</button>
                                                <button onClick={saveSelectedEmployees} className="px-4 py-2 bg-[#2B2342] text-white rounded">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="mt-2 border p-4 rounded-md">
                                <h3 className="text-[14px] font-medium text-gray-400">Selected Employees:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedEmployees.map(emp => (
                                        <span key={emp.id} className="p-1 bg-gray-200 rounded flex items-center">
                                            {emp.name} <button onClick={() => removeSelectedEmployee(emp.id)} className="ml-1 text-red-500">&times;</button>
                                        </span>
                                    ))}
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

            <div className="mt-8 bg-white min-h-svh h-full">

                <table className="w-full border-collapse  border-gray-300">
                    <thead>
                        <tr className="bg-[#465062] ">
                            <th className=" p-4 text-start font-normal text-white rounded-tl-lg">Title</th>
                            <th className=" p-4 text-start font-normal text-white">Category</th>
                            <th className=" p-4 text-start font-normal text-white">Mode</th>
                            <th className=" p-4 text-start font-normal text-white">Duration</th>
                            {/* <th className=" p-4 text-start font-normal text-white">Employee</th> */}
                            <th className=" p-4 text-start font-normal text-white">Start Date</th>
                            <th className=" p-4 text-start font-normal text-white rounded-tr-lg">End Date</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {trainings.map((training, index) => (
                            <tr key={index} className="border">
                                <td className=" p-4">{training.trainingTitle}</td>
                                <td className=" p-4">{training.category}</td>
                                <td className=" p-4">{training.trainingMode}</td>
                                <td className=" p-4">{training.duration}</td>
                                {/* <td className=" p-4">{training.employees?.name}</td> */}
                                <td className=" p-4">{training.startDate}</td>
                                <td className=" p-4">{training.endDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TrainingManagement;
