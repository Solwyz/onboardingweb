import React, { useState, useEffect } from "react";
import deleteIcon from "../../../../Assets/Superadmin/delete.svg";
import arrowIcon from "../../../../Assets/Superadmin/arrow.svg";
import Api from "../../../../Services/Api";

function Department({ onBack }) {
  
  const [formData, setFormData] = useState({
    department: "",
    name: "",
    resourceManager: "",
    office: "",
    valueStream: "",
  });

  const [errors, setErrors] = useState({
    office: "",
    valueStream: "",
  });

  const token = localStorage.getItem("token");

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [departmentData, setDepartmentData] = useState([]);
  const [isModified, setIsModified] = useState(false);

  // Enable submit only if all fields are filled and no validation errors
  const isFormValid =
    formData.name &&
    formData.resourceManager &&
    formData.office &&
    formData.valueStream &&
    !errors.office &&
    !errors.valueStream;

  useEffect(() => {
    const savedDepartment =
      JSON.parse(localStorage.getItem("DepartmentData")) || [];
    setDepartmentData(savedDepartment);
  }, []);

  // Handles input field changes with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Validation rules
    if (name === "office") {
      if (!/^\d{10,}$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          office: "Work mobile must be at least 10 digits.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, office: "" }));
      }
    }

    if (name === "valueStream") {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          valueStream: "Enter a valid email address.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, valueStream: "" }));
      }
    }

    setIsModified(true);
  };

  const handleOkClick =()=> {
    setIsModalOpen(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    Api.post(
      "api/department",
      {
        departmentName: formData.name,
        manager: formData.resourceManager,
        workMobile: formData.office,
        workEmail: formData.valueStream
      },
      { Authorization: `Bearer ${token}` }
    ).then((response) => {
      console.log(response);
      if (response && response.status === 200) {
        setIsModalOpen(true)
        // alert('New Department added successfully')
      }
    });

    const updatedDepartment = [...departmentData, formData];

    localStorage.setItem("DepartmentData", JSON.stringify(updatedDepartment));

    setDepartmentData(updatedDepartment);

    setFormData({
      department: "",
      name: "",
      resourceManager: "",
      office: "",
      valueStream: "",
    });
    setIsModified(false);
  };

  return (
    <div className="p-4 ml-[16px]">
      <div className="flex text-[20px] font-normal mt-[24px]">
        <a href="#" className="text-[#498EF6]">
          Resource Pool
        </a>
        <img src={arrowIcon} className="ml-[10px]" alt="icon1" />
        <span className="ml-[8px]">Department</span>
      </div>

      <div className="bg-white w-auto h-auto mt-[16px] shadow-lg p-[24px] rounded-lg">
        <h1 className="text-lg font-semibold">General</h1>

        <form onSubmit={handleSubmit} className="mt-[36px]">
          <div className="flex gap-4">
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#373737]">
                Department Name
              </label>
              <input
                type="text"
                name="name"
                className="block w-[247px] h-[48px] border border-[#E6E6E7] rounded-[8px] text-sm font-normal text-[#696A70] mt-[8px] py-2 px-3 focus:outline-none"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-normal text-[#373737]">
                Manager
              </label>
              <input
                type="text"
                name="resourceManager"
                className="block w-[247px] h-[48px] border border-[#E6E6E7] text-sm font-normal text-[#696A70] rounded-[8px] mt-[8px] py-2 px-3 focus:outline-none"
                value={formData.resourceManager}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex gap-4 mt-[24px]">
            <div>
              <label className="block text-sm font-normal text-[#373737]">
                Work Mobile:
              </label>
              <input
                type="text"
                name="office"
                className={`block w-[247px] h-[48px] border ${errors.office ? "border-red-500" : "border-[#E6E6E7]"
                  } text-sm font-normal text-[#696A70] rounded-[8px] mt-[8px] py-2 px-3 focus:outline-none`}
                value={formData.office}
                onChange={handleInputChange}
              />
              {errors.office && (
                <p className="text-red-500 text-xs mt-1">{errors.office}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-normal text-[#373737]">
                Work Email:
              </label>
              <input
                type="text"
                name="valueStream"
                className={`block w-[247px] h-[48px] border ${errors.valueStream ? "border-red-500" : "border-[#E6E6E7]"
                  } text-sm font-normal text-[#696A70] rounded-[8px] mt-[8px] py-2 px-3 focus:outline-none`}
                value={formData.valueStream}
                onChange={handleInputChange}
              />
              {errors.valueStream && (
                <p className="text-red-500 text-xs mt-1">{errors.valueStream}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-[24px] mr-[24px] mb-[24px] col-span-2">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`bg-[#232E42] w-[107px] h-[48px] text-white font-medium px-6 py-2 rounded-[8px] ${!isFormValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-neutral-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-auto p-10  shadow-lg">
            <div className='text-[18px] text-[#373737]'>New Department added successfully</div>
            <div className='flex gap-4 mt-8 w-fit ml-auto'>
              <button className='bg-[#405170] hover:bg-[#232E42] w-[72px] h-[42px] text-white font-light rounded-[8px]' onClick={handleOkClick}>OK</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Department;
