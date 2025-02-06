import React, { useState, useEffect } from "react";
import CloseBtn from "../../../Assets/HrTas/close.svg";
import Api from "../../../Services/Api";
import { ClipLoader } from "react-spinners";

function TimeSheetModal({
  isOpen,
  onClose,
  onAdd,
  setRefreshKey,
  dataToEdit,
  setDataToEdit,
}) {
  const initialFormData = {
    date: dataToEdit?.date || "",
    employeeName: dataToEdit?.employee?.id || "",
    project: dataToEdit?.project?.id || "",
    task: dataToEdit?.task || "",
    description: dataToEdit?.description || "",
    hour: dataToEdit?.duration
      ? parseInt(dataToEdit.duration.split(":")[0])
      : 0,
    minute: dataToEdit?.duration
      ? parseInt(dataToEdit.duration.split(":")[1])
      : 0,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await Api.get("api/employee/api/employees/active", {
          Authorization: `Bearer ${token}`,
        });

        if (response?.data) {
          setEmployees(response.data);
        } else {
          console.error("Invalid response:", response);
          alert("Could not fetch employee data. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        alert("Failed to fetch employees.");
      }
    };

    Api.get("api/project", {
      Authorization: `Bearer ${token}`,
    }).then((response) => {
      if (response && response.data) {
        setProjects(response.data.content);
        console.log("pppp", response.data.content);
      } else {
        console.error("Invalid response data:", response);
        alert("Can not fetch Projects List. Please try again");
      }
    });
    fetchEmployees();
  }, []);

  useEffect(() => {
    console.log("dataToEdit:", dataToEdit);
    console.log("Employees List:", employees);
  
    if (isOpen && dataToEdit) {
      setFormData({
        date: dataToEdit.date || "",
        employeeName: dataToEdit.employee?.id || "", // Ensure it's an ID
        project: dataToEdit.project?.id || "",
        task: dataToEdit.task || "",
        description: dataToEdit.description || "",
        hour: dataToEdit.duration ? parseInt(dataToEdit.duration.split(":")[0]) : 0,
        minute: dataToEdit.duration ? parseInt(dataToEdit.duration.split(":")[1]) : 0,
      });
    }
  }, [isOpen, dataToEdit, employees]); // Ensure it updates when employees are fetched
  // Re-run when employees are loaded

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add form validation logic here if needed

    onAdd(formData);
  };

  if (!isOpen) {
    return null; // Do not render the modal if it is not open
  }

  const validateForm = () => {
    const newErrors = {};

    if (!formData.date.trim()) newErrors.date = "Date is required.";
    if (!formData.employeeName.trim())
      newErrors.employeeName = "Employee name is required.";
    if (!formData.project.trim())
      newErrors.project = "Project name is required.";
    if (!formData.task.trim()) newErrors.task = "Task is required.";
    const totalDuration =
      parseInt(formData.hour) * 60 + parseInt(formData.minute);
    if (totalDuration <= 0) {
      newErrors.duration = "Total duration must be greater than zero.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDurationChange = (e) => {
    const { name, value } = e.target;

    if (name === "minute" && value > 59) return;

    setFormData({ ...formData, [name]: parseInt(value) || 0 });
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("timeAdd:", formData);
      setIsAdding(true);
      Api.post(
        "api/timesheet",
        {
          date: formData.date,
          project: {
            id: formData.project,
          },
          employee: {
            id: formData.employeeName,
          },
          task: formData.task,
          description: formData.description,
          duration: formData.hour + ":" + formData.minute,
        },
        { Authorization: `Bearer ${token}` }
      ).then((response) => {
        setIsAdding(false);
        onClose();
        if (response && response.data) {
          console.log("kkk", response.data);
          setRefreshKey((prev) => prev + 1);
        } else {
          console.error("Invalid response data: ", response);
          alert("Can not add new data. Please try again");
        }
      });
      // onAdd(formData);
      // onClose();
    }
  };

  const formatDateToInput = (date) => {
    if (!date) return ""; // Handle empty value
    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`;
  };

  const formatDateToDDMMYYYY = (date) => {
    if (!date) return ""; // Handle empty value
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleUpdate = (id) => {
    if (validateForm()) {
      console.log("iddd", id);
      console.log("updateTimedata:", formData);
      setIsUpdating(true);
      Api.put(
        "api/timesheet",
        {
          id: id,
          date: formData.date,
          project: {
            id: formData.project,
          },
          employee: {
            id: formData.employeeName,
          },
          task: formData.task,
          description: formData.description,
          duration: formData.hour + ":" + formData.minute,
        },
        { Authorization: `Bearer ${token}` }
      ).then((response) => {
        setIsUpdating(false);
        onClose();
        if (response && response.data) {
          console.log("updteresppp:", response);
          setRefreshKey((prev) => prev + 1);
        } else {
          console.error("Invalid response data: ", response);
          alert("Can not update data. Please try agaian");
        }
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {isAdding ? (
        <div className="bg-white p-8">
          <div className="px-4 flex gap-4">
            <div>
              <ClipLoader
                color={"#465062"}
                loading={true}
                size={35}
                aria-label="Loading Spinner"
                data-testid="Loader"
              />
            </div>
            <div className="mt-2">Adding Please wait..</div>
          </div>
        </div>
      ) : (
        <div>
          {" "}
          {isUpdating ? (
            <div className="bg-white p-8">
              <div className="px-4 flex gap-4">
                <div>
                  <ClipLoader
                    color={"#465062"}
                    loading={true}
                    size={35}
                    aria-label="Loading Spinner"
                    data-testid="Loader"
                  />
                </div>
                <div className="mt-2">Updating Please wait..</div>
              </div>
            </div>
          ) : (
            <div className="bg-white w-[834px] p-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[16px] text-[#6C55B2] font-medium">
                  Add your Time sheet
                </h2>
                <button
                  onClick={onClose}
                  className="text-[#232E42] text-[20px]"
                >
                  <img src={CloseBtn} alt="Close" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4 text-[14px] font-normal">
                <div>
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    className={`border w-full p-2 rounded-md ${
                      errors.date ? "border-red-500" : ""
                    }`}
                    value={formatDateToInput(formData.date)} // Convert DD-MM-YYYY to YYYY-MM-DD for the input
                    onChange={(e) => {
                      const selectedDate = e.target.value; // Always in YYYY-MM-DD format
                      setFormData({
                        ...formData,
                        date: formatDateToDDMMYYYY(selectedDate),
                      }); // Store in DD-MM-YYYY format
                    }}
                    max={new Date().toISOString().split("T")[0]}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm">{errors.date}</p>
                  )}
                </div>
                <div>
                  <label>Employee Name</label>
                  <select
                    name="employeeName"
                    value={formData.employeeName} // Ensure this matches employee.id
                    onChange={handleChange}
                    className={`border w-full p-2 rounded-md ${
                      errors.employeeName ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Select Employee</option>
                    {employees.length > 0 ? (
                      employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.name}{" "}
                          {/* Ensuring name is displayed correctly */}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        Loading employees...
                      </option>
                    )}
                  </select>
                  {errors.employeeName && (
                    <p className="text-red-500 text-sm">
                      {errors.employeeName}
                    </p>
                  )}
                </div>

                <div>
                  <label>Project</label>
                  <select
                    type="text"
                    name="project"
                    placeholder="Project name"
                    className={`border w-full p-2 rounded-md ${
                      errors.project ? "border-red-500" : ""
                    }`}
                    value={formData.project}
                    onChange={handleChange}
                  >
                    <option value="123">Select Project</option>
                    {projects?.map((project, index) => (
                      <option key={index} value={project.id}>
                        {project.projectName}
                      </option>
                    ))}
                  </select>
                  {errors.project && (
                    <p className="text-red-500 text-sm">{errors.project}</p>
                  )}
                </div>
                <div>
                  <label>Task</label>
                  <input
                    type="text"
                    name="task"
                    placeholder="Add text here"
                    className={`border w-full p-2 rounded-md ${
                      errors.task ? "border-red-500" : ""
                    }`}
                    value={formData.task}
                    onChange={handleChange}
                  />
                  {errors.task && (
                    <p className="text-red-500 text-sm">{errors.task}</p>
                  )}
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
                <div className="mt-[25px]">Duration</div>
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
                {errors.duration && (
                  <p className="text-red-500 text-sm">{errors.duration}</p>
                )}
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={onClose}
                  className="border px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={
                    dataToEdit
                      ? () => handleUpdate(dataToEdit.id)
                      : handleSubmit
                  }
                  className="bg-[#6C55B2] text-white px-4 py-2 rounded-md"
                >
                  {dataToEdit ? "Update" : "Add"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TimeSheetModal;
