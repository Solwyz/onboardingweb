import React, { useState } from "react";
import tickIcon from "../../../../Assets/HrTas/check.svg";
import FinalDetailsForm from "./FinalDetailsForm";
import BackButton from "./BackButton";
import NewProgressive from "./NewProgressive";
import Api from "../../../../Services/Api";

const token = localStorage.getItem("token");
console.log("token:", token);

function PhysicalDetailsForm({ setShowPhysicalForm, ids, setIds }) {
  const [showFinalForm, setShowFinalForm] = useState(false);
  const [responsePhysId,setresponsePhysId] = useState(null)
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    bloodType: "",
    visionLeft: "",
    visionRight: "",
    hearingLeft: "",
    hearingRight: "",
  });

  const [errors, setErrors] = useState({
    height: "",
    weight: "",
    bloodType: "",
    visionLeft: "",
    visionRight: "",
    hearingLeft: "",
    hearingRight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the input on change
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "height":
        if (!value) {
          error = "Height is required.";
        } else if (isNaN(value) || value <= 0) {
          error = "Enter a valid positive number for height.";
        } else if (!/^\d*\.?\d*$/.test(value)) {
          // Check for non-numeric input
          error = "Enter only numbers for height.";
        }
        break;
      case "weight":
        if (!value) {
          error = "Weight is required.";
        } else if (isNaN(value) || value <= 0) {
          error = "Enter a valid positive number for weight.";
        } else if (!/^\d*\.?\d*$/.test(value)) {
          // Check for non-numeric input
          error = "Enter only numbers for weight.";
        }
        break;
      case "bloodType":
        if (!value) {
          error = "Blood type is required.";
        }
        break;
      case "visionLeft":
        if (!value) {
          error = "Vision (Left) is required.";
        }
        break;
      case "visionRight":
        if (!value) {
          error = "Vision (Right) is required.";
        }
        break;
      case "hearingLeft":
        if (!value) {
          error = "Hearing (Left) is required.";
        }
        break;
      case "hearingRight":
        if (!value) {
          error = "Hearing (Right) is required.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      height: "",
      weight: "",
      bloodType: "",
      visionLeft: "",
      visionRight: "",
      hearingLeft: "",
      hearingRight: "",
    };

    // Validate height
    if (!formData.height) {
      newErrors.height = "Height is required.";
      valid = false;
    } else if (isNaN(formData.height) || formData.height <= 0) {
      newErrors.height = "Enter a valid positive number for height.";
      valid = false;
    }

    // Validate weight
    if (!formData.weight) {
      newErrors.weight = "Weight is required.";
      valid = false;
    } else if (isNaN(formData.weight) || formData.weight <= 0) {
      newErrors.weight = "Enter a valid positive number for weight.";
      valid = false;
    }

    // Validate blood type
    if (!formData.bloodType) {
      newErrors.bloodType = "Blood type is required.";
      valid = false;
    }

    // Validate vision
    if (!formData.visionLeft) {
      newErrors.visionLeft = "Vision (Left) is required.";
      valid = false;
    }
    if (!formData.visionRight) {
      newErrors.visionRight = "Vision (Right) is required.";
      valid = false;
    }

    // Validate hearing
    if (!formData.hearingLeft) {
      newErrors.hearingLeft = "Hearing (Left) is required.";
      valid = false;
    }
    if (!formData.hearingRight) {
      newErrors.hearingRight = "Hearing (Right) is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    if (validateForm()) {
      console.log("Proceed to the next step");
      console.log(formData);
      Api.post(
        "api/physical",
        {
          height: formData.height,
          weight: formData.weight,
          leftVision: formData.visionLeft,
          rightVision: formData.visionRight,
          leftHearing: formData.hearingLeft,
          rightHearing: formData.hearingRight,
          bloodType: formData.bloodType,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      ).then((response) => {
        if(response && response.data) {
          setShowFinalForm(true);
          console.log("physical:", response);
          setresponsePhysId(response.data.id)
          setIds((prevIds) => ({...prevIds, ["physicalID"]: response.data.id}));
          console.log('jtttt',ids)
          console.log(response.data.id)
        }
        
      });
    }
  };

  // Blood types array
  const bloodTypes = [
    "A_POSITIVE",
    "A_NEGATIVE",
    "B_POSITIVE",
    "B_NEGATIVE",
    "AB_POSITIVE",
    "AB_NEGATIVE",
    "O_POSITIVE",
    "O_NEGATIVE",
  ];

  return (
    <div>
      {!showFinalForm ? (
        <div className="bg-[#F8FAFB] pl-6 pr-12">
          <NewProgressive stage={"Physical"} />

          <div className="flex justify-start mt-6">
            <BackButton stateValue={setShowPhysicalForm} />
          </div>

          <div className="Details-form bg-white mt-8 p-6">
            <div>
              <h1 className="text-[20px] font-medium">Physical</h1>
              <div className="border w-full mt-4"></div>
              <div className="flex mt-[16px]">
                <div>
                  <label className="block text-sm text-[#373737] font-normal">
                    Height(cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className={`w-[247px] h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] focus:outline-none font-normal ${
                      errors.height ? "border-red-500" : ""
                    }`}
                    min="0"
                  />
                  {errors.height && (
                    <p className="text-red-500 text-sm">{errors.height}</p>
                  )}
                </div>

                <div className="ml-[16px]">
                  <label className="block text-sm font-normal text-[#373737]">
                    Weight(Kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className={`w-[247px] focus:outline-none h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal ${
                      errors.weight ? "border-red-500" : ""
                    }`}
                    min="0"
                  />
                  {errors.weight && (
                    <p className="text-red-500 text-sm">{errors.weight}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-normal text-[#373737]">
                  Blood type
                </label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  className={`w-[247px] focus:outline-none h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal ${
                    errors.bloodType ? "border-red-500" : ""
                  }`}
                >
                  <option value="" disabled>
                    Select blood type
                  </option>
                  {bloodTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.bloodType && (
                  <p className="text-red-500 text-sm">{errors.bloodType}</p>
                )}
              </div>
            </div>

            {/* Vision Section */}
            <div>
              <h1 className="text-[20px] font-medium mt-8">Vision</h1>
              <div className="border w-full mt-4"></div>
              <div className="flex mt-[16px]">
                <div>
                  <label className="block text-sm text-[#373737] font-normal">
                    Left
                  </label>
                  <input
                    type="text"
                    name="visionLeft"
                    value={formData.visionLeft}
                    onChange={handleChange}
                    className={`w-[247px] h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] focus:outline-none font-normal ${
                      errors.visionLeft ? "border-red-500" : ""
                    }`}
                  />
                  {errors.visionLeft && (
                    <p className="text-red-500 text-sm">{errors.visionLeft}</p>
                  )}
                </div>

                <div className="ml-[16px]">
                  <label className="block text-sm font-normal text-[#373737]">
                    Right
                  </label>
                  <input
                    type="text"
                    name="visionRight"
                    value={formData.visionRight}
                    onChange={handleChange}
                    className={`w-[247px] focus:outline-none h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal ${
                      errors.visionRight ? "border-red-500" : ""
                    }`}
                  />
                  {errors.visionRight && (
                    <p className="text-red-500 text-sm">{errors.visionRight}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Hearing Section */}
            <div>
              <h1 className="text-[20px] font-medium mt-8">Hearing</h1>
              <div className="border w-full mt-4"></div>
              <div className="flex mt-[16px]">
                <div>
                  <label className="block text-sm text-[#373737] font-normal">
                    Left
                  </label>
                  <input
                    type="text"
                    name="hearingLeft"
                    value={formData.hearingLeft}
                    onChange={handleChange}
                    className={`w-[247px] h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] focus:outline-none font-normal ${
                      errors.hearingLeft ? "border-red-500" : ""
                    }`}
                  />
                  {errors.hearingLeft && (
                    <p className="text-red-500 text-sm">{errors.hearingLeft}</p>
                  )}
                </div>

                <div className="ml-[16px]">
                  <label className="block text-sm font-normal text-[#373737]">
                    Right
                  </label>
                  <input
                    type="text"
                    name="hearingRight"
                    value={formData.hearingRight}
                    onChange={handleChange}
                    className={`w-[247px] focus:outline-none h-[48px] px-[16px] py-[14px] mt-[8px] border rounded-[8px] border-[#E6E6E7] text-[14px] text-[#696A70] font-normal ${
                      errors.hearingRight ? "border-red-500" : ""
                    }`}
                  />
                  {errors.hearingRight && (
                    <p className="text-red-500 text-sm">
                      {errors.hearingRight}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-end mt-[32px]">
              <button
                className={`text-[14px] text-white text-center rounded-lg px-8 h-[48px]
                        ${
                          Object.values(errors).some((error) => error)
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#2B2342]"
                        }`}
                onClick={handleNext}
                disabled={Object.values(errors).some((error) => error)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <FinalDetailsForm
          setShowFinalForm={setShowFinalForm}
          showFinalForm={showFinalForm}
          ids={ids}
          setIds={setIds}
        />
      )}
    </div>
  );
}

export default PhysicalDetailsForm;
