import React, { useState, useEffect } from "react";
import tickIcon from "../../../../Assets/HrTas/check.svg";
import PhysicalDetailsForm from "./PhysicalDetailsForm";
import BackButton from "./BackButton";
import NewProgressive from "./NewProgressive";
import Api from "../../../../Services/Api";

const token = localStorage.getItem("token");

function ContactDetailsForm({ setShowContactForm,ids, setIds }) {
    const [showPhysicalForm, setShowPhysicalForm] = useState(false);
    const [formData, setFormData] = useState({
        primaryMobile: "",
        secondaryMobile: "",
        primaryAddress: "",
        primaryPincode: "",
        primaryCity: "",
        primaryState: "",
        secondaryAddress: "",
        secondaryPincode: "",
        secondaryCity: "",
        secondaryState: "",
        emergencyFirstName: "",
        emergencyLastName: "",
        emergencyRelationship: "",
        emergencyContactNumber: "",
    });
    const [errors, setErrors] = useState({});
    const [sameAsPrimary, setSameAsPrimary] = useState(false);
    const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
    const [isSameAddress, setIsSameAddress] = useState(false);
    const [responseContactID, setResponseContactID] = useState(null)

    const handleCheckboxChange = () => {
        setSameAsPrimary(!sameAsPrimary);
    };

    useEffect(() => {
        if (sameAsPrimary) {
            // Copy primary address fields to secondary fields
            setFormData((prev) => ({
                ...prev,
                secondaryAddress: prev.primaryAddress,
                secondaryPincode: prev.primaryPincode,
                secondaryCity: prev.primaryCity,
                secondaryState: prev.primaryState,
            }));
        }
    }, [sameAsPrimary]);

    const validateField = (name, value) => {
        let error = "";

        // Only numbers allowed for phone and pincode fields
        if (
            [
                "primaryMobile",
                "secondaryMobile",
                "emergencyContactNumber",
                "primaryPincode",
                "secondaryPincode",
            ].includes(name)
        ) {
            if (!/^\d*$/.test(value)) {
                error = "Only numbers are allowed";
            } else if (name.includes("Mobile") && value.length !== 10) {
                error = "Please enter a 10-digit number";
            } else if (name.includes("Pincode") && value.length !== 6) {
                error = "Please enter a valid pincode";
            }
        }
        // Only letters and spaces are allowed for text fields
        else if (
            [
                "primaryCity",
                "primaryState",
                "secondaryCity",
                "secondaryState",
                "emergencyFirstName",
                "emergencyLastName",
                "emergencyRelationship",
            ].includes(name)
        ) {
            if (!/^[a-zA-Z\s]*$/.test(value)) {
                error = "Only letters and spaces are allowed";
            }
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update field value
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Validate the current input
        validateField(name, value);

        // Check if all required fields are filled and valid
        const allFieldsFilled = Object.values({
            ...formData,
            [name]: value, // Include the current input value in the check
        }).every((field) => field.trim() !== "");

        // Validate mobile numbers
        const primaryMobileValid = formData.primaryMobile.length === 10;
        const secondaryMobileValid =
            formData.secondaryMobile.length === 10 || formData.secondaryMobile === ""; // Allow empty secondary mobile

        // Check if all errors are resolved
        const allValid = Object.values(errors).every((error) => !error);

        // Enable the "Next" button if all conditions are met
        setIsNextButtonEnabled(
            allFieldsFilled && allValid && primaryMobileValid && secondaryMobileValid
        );

        // If "same address" is checked, update secondary fields
        if (isSameAddress && name.startsWith("primary")) {
            const secondaryName = name.replace("primary", "secondary");
            setFormData((prevData) => ({
                ...prevData,
                [secondaryName]: value,
            }));
            validateField(secondaryName, value);
        }
    };

    const handleNextClick = () => {
        if (isNextButtonEnabled) {
            console.log("Form Data Submitted:", formData);
            setShowPhysicalForm(true);

            Api.post(
                "api/contactForm",
                {
                    primaryNumber: formData.primaryMobile,
                    secondaryNumber: formData.secondaryMobile,
                    pinocode: formData.primaryPincode,
                    city: formData.primaryCity,
                    state: formData.primaryState,
                    secondaryPinocode: formData.secondaryPincode,
                    secondaryCity: formData.secondaryCity,
                    secondaryState: formData.secondaryState,
                    firstName: formData.emergencyFirstName,
                    lastName: formData.emergencyLastName,
                    relationship: formData.emergencyRelationship,
                },
                { Authorization: `Bearer ${token}` }
            )
                .then((response) =>{
                    console.log("Response:", response)
                setResponseContactID(response.data.id)
                setIds((prevIds) => ({ ...prevIds, ["contactID"]: response.data.id }));
                console.log('kjlkl', ids)
                console.log("contact",response.data.id);
                
            })
                
           
                .catch((error) => console.error("Error:", error));
        }
    };

    return (
        <div>
            {!showPhysicalForm ? (
                <div>
                    <NewProgressive stage={"Contact"} />
                    <div className="flex justify-start mt-6 mx-6">
                        <BackButton stateValue={setShowContactForm} />
                    </div>
                    <div className="mx-[24px] mt-[32px] p-6 w-auto bg-white shadow-lg">
                        {/* Contact Section */}
                        <div>
                            <h2 className="text-[20px] font-medium">Contact</h2>
                            <div className="border-b border-[#E6E6E7] w-auto items-center justify-center mt-[16px] mx-auto"></div>
                            <div className="flex mt-[16px]">
                                <div>
                                    <label className="block font-normal text-[#373737] text-[14px]">
                                        Primary Mobile Number
                                    </label>
                                    <input
                                        type="text"
                                        name="primaryMobile"
                                        maxLength="10"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={formData.primaryMobile}
                                        onChange={handleInputChange}
                                        onInput={(e) =>
                                            (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                                        }
                                        className="px-3 py-2 border w-[247px] h-[48px] text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg"
                                    />
                                    {errors.primaryMobile && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {errors.primaryMobile}
                                        </div>
                                    )}
                                </div>
                                <div className="ml-[16px]">
                                    <label className="block font-normal text-[#373737] text-[14px]">
                                        Secondary Mobile Number
                                    </label>
                                    <input
                                        type="text"
                                        name="secondaryMobile"
                                        maxLength="10"
                                        value={formData.secondaryMobile}
                                        onChange={handleInputChange}
                                        onInput={(e) =>
                                            (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                                        }
                                        className="px-3 py-2 border w-[247px] h-[48px] text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg"
                                    />
                                    {errors.secondaryMobile && (
                                        <div className="text-red-500 mt-1 text-xs">
                                            {errors.secondaryMobile}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Address Section */}
                        <div className="mt-[32px]">
                            <h2 className="text-[20px] font-medium">Address</h2>
                            <div className="border-b border-[#E6E6E7] w-auto items-center justify-center mt-[16px] mx-auto"></div>
                            <div className="flex">
                                {/* Primary Address */}
                                <div className="mt-4">
                                    <label className="block font-normal text-[#373737] text-[14px]">
                                        Primary Address
                                    </label>
                                    <textarea
                                        name="primaryAddress"
                                        value={formData.primaryAddress}
                                        onChange={handleInputChange}
                                        className="px-3 mt-2 py-2 border w-[440px] h-[80px] border-[#E6E6E7] focus:outline-[#A4A4E5] text-[#696A70] text-[14px] font-normal rounded-lg"
                                        rows="2"
                                    />
                                    {errors.primaryAddress && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {errors.primaryAddress}
                                        </div>
                                    )}

                                    <div className="flex mt-4">
                                        <div>
                                            <label className="block font-normal text-[#373737] text-[14px]">
                                                Pincode
                                            </label>
                                            <input
                                                type="text"
                                                name="primaryPincode"
                                                maxLength="6"
                                                value={formData.primaryPincode}
                                                onChange={handleInputChange}
                                                onInput={(e) =>
                                                (e.target.value = e.target.value.replace(
                                                    /[^0-9]/g,
                                                    ""
                                                ))
                                                }
                                                className="px-3 py-2 border w-[178px] h-[48px] text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg"
                                            />
                                            {errors.primaryPincode && (
                                                <div className="text-red-500 text-xs mt-1">
                                                    {errors.primaryPincode}
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            <label className="block font-normal text-[#373737] text-[14px]">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                name="primaryCity"
                                                value={formData.primaryCity}
                                                onChange={handleInputChange}
                                                onInput={(e) =>
                                                (e.target.value = e.target.value.replace(
                                                    /[^a-zA-Z\s]/g,
                                                    ""
                                                ))
                                                }
                                                className="px-3 py-2 border w-[247px] h-[48px] text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg"
                                            />
                                            {errors.primaryCity && (
                                                <div className="text-red-500 text-xs mt-1">
                                                    {errors.primaryCity}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block font-normal text-[#373737] text-[14px]">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            name="primaryState"
                                            value={formData.primaryState}
                                            onChange={handleInputChange}
                                            onInput={(e) =>
                                            (e.target.value = e.target.value.replace(
                                                /[^a-zA-Z\s]/g,
                                                ""
                                            ))
                                            }
                                            className="px-3 py-2 border w-[178px] h-[48px] text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg"
                                        />
                                        {errors.primaryState && (
                                            <div className="text-red-500 text-xs mt-1">
                                                {errors.primaryState}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Secondary Address */}
                                <div className="ml-[150px] mt-[16px]">
                                    <div className="flex items-center justify-between">
                                        <label className="block font-normal text-[#373737] text-[14px]">
                                            Secondary Address
                                        </label>
                                        <div className="justify-center">
                                            <input
                                                type="checkbox"
                                                id="sameAsPrimary"
                                                className="mr-2 accent-[#232E42]"
                                                checked={sameAsPrimary}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label
                                                htmlFor="sameAsPrimary"
                                                className="font-normal justify-center text-[14px]"
                                            >
                                                Same as Primary
                                            </label>
                                        </div>
                                    </div>

                                    <textarea
                                        name="secondaryAddress"
                                        value={
                                            sameAsPrimary
                                                ? formData.primaryAddress
                                                : formData.secondaryAddress
                                        }
                                        onChange={handleInputChange}
                                        className="px-3 mt-[6px] py-2 border w-[440px] h-[80px] border-[#E6E6E7] focus:outline-[#A4A4E5] text-[#696A70] text-[14px] font-normal rounded-lg"
                                        rows="2"
                                        disabled={sameAsPrimary}
                                    />
                                    {errors.secondaryAddress && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {errors.secondaryAddress}
                                        </div>
                                    )}

                                    <div className="flex mt-4">
                                        <div>
                                            <label className="block font-normal text-[#373737] text-[14px]">
                                                Pincode
                                            </label>
                                            <input
                                                type="text"
                                                name="secondaryPincode"
                                                maxLength="6"
                                                value={
                                                    sameAsPrimary
                                                        ? formData.primaryPincode
                                                        : formData.secondaryPincode
                                                }
                                                onChange={handleInputChange}
                                                disabled={sameAsPrimary}
                                                onInput={(e) =>
                                                (e.target.value = e.target.value.replace(
                                                    /[^0-9]/g,
                                                    ""
                                                ))
                                                }
                                                className="px-3 py-2 border w-[178px] h-[48px] text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg"
                                            />
                                            {errors.secondaryPincode && (
                                                <div className="text-red-500 text-xs mt-1">
                                                    {errors.secondaryPincode}
                                                </div>
                                            )}
                                        </div>

                                        <div className="ml-[16px]">
                                            <label className="block font-normal text-[#373737] text-[14px]">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                name="secondaryCity"
                                                value={
                                                    sameAsPrimary
                                                        ? formData.primaryCity
                                                        : formData.secondaryCity
                                                }
                                                onChange={handleInputChange}
                                                disabled={sameAsPrimary}
                                                onInput={(e) =>
                                                (e.target.value = e.target.value.replace(
                                                    /[^a-zA-Z\s]/g,
                                                    ""
                                                ))
                                                }
                                                className="px-3 py-2 border w-[247px] h-[48px] text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg"
                                            />
                                            {errors.secondaryCity && (
                                                <div className="text-red-500 text-xs mt-1">
                                                    {errors.secondaryCity}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label className="block font-normal text-[#373737] text-[14px]">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            name="secondaryState"
                                            value={
                                                sameAsPrimary
                                                    ? formData.primaryState
                                                    : formData.secondaryState
                                            }
                                            onChange={handleInputChange}
                                            disabled={sameAsPrimary}
                                            onInput={(e) =>
                                            (e.target.value = e.target.value.replace(
                                                /[^a-zA-Z\s]/g,
                                                ""
                                            ))
                                            }
                                            className="px-3 py-2 border w-[178px] h-[48px] text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg"
                                        />
                                        {errors.secondaryState && (
                                            <div className="text-red-500 text-xs mt-1">
                                                {errors.secondaryState}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Emergency Contact Section */}
                        <div className="mt-[32px]">
                            <h2 className="text-[20px] font-medium">Emergency Contact</h2>
                            <div className="border-b border-[#E6E6E7] w-auto items-center justify-center mt-[16px] mx-auto"></div>
                            <div className="flex mt-[16px]">
                                <div>
                                    <label className="block font-normal text-[#373737] text-[14px]">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="emergencyFirstName"
                                        value={formData.emergencyFirstName}
                                        onChange={handleInputChange}
                                        onInput={(e) =>
                                        (e.target.value = e.target.value.replace(
                                            /[^a-zA-Z\s]/g,
                                            ""
                                        ))
                                        }
                                        className="px-3 py-2 border w-[247px] h-[48px] text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg"
                                    />
                                    {errors.emergencyFirstName && (
                                        <div className="text-red-500 mt-1 text-xs">
                                            {errors.emergencyFirstName}
                                        </div>
                                    )}
                                </div>
                                <div className="ml-[16px]">
                                    <label className="block font-normal text-[#373737] text-[14px]">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="emergencyLastName"
                                        value={formData.emergencyLastName}
                                        onChange={handleInputChange}
                                        onInput={(e) =>
                                        (e.target.value = e.target.value.replace(
                                            /[^a-zA-Z\s]/g,
                                            ""
                                        ))
                                        }
                                        className="px-3 py-2 border w-[247px] h-[48px] text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg"
                                    />
                                    {errors.emergencyLastName && (
                                        <div className="text-red-500 mt-1 text-xs">
                                            {errors.emergencyLastName}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex mt-[16px]">
                                <div>
                                    <label className="block font-normal text-[#373737] text-[14px]">
                                        Relationship
                                    </label>
                                    <input
                                        type="text"
                                        name="emergencyRelationship"
                                        value={formData.emergencyRelationship}
                                        onInput={(e) =>
                                        (e.target.value = e.target.value.replace(
                                            /[^a-zA-Z\s]/g,
                                            ""
                                        ))
                                        }
                                        onChange={handleInputChange}
                                        className="px-3 py-2 border w-[247px] h-[48px] text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg"
                                    />
                                    {errors.emergencyRelationship && (
                                        <div className="text-red-500 mt-1 text-xs">
                                            {errors.emergencyRelationship}
                                        </div>
                                    )}
                                </div>
                                <div className="ml-[16px]">
                                    <label className="block font-normal text-[#373737] text-[14px]">
                                        Emergency Contact Number
                                    </label>
                                    <input
                                        type="text"
                                        maxLength="10"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        name="emergencyContactNumber"
                                        value={formData.emergencyContactNumber}
                                        onChange={handleInputChange}
                                        onInput={(e) =>
                                            (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                                        }
                                        className="px-3 py-2 border w-[247px] h-[48px] text-[#696A70] text-[14px] font-normal border-[#E6E6E7] focus:outline-[#A4A4E5] mt-[8px] rounded-lg"
                                    />
                                    {errors.emergencyContactNumber && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {errors.emergencyContactNumber}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Next Button */}
                        <div className="flex justify-end mt-[32px]">
                            <button
                                type="button"
                                className={`text-[14px] text-white bg-[#2B2342] text-center rounded-lg px-8 h-[48px]  ${isNextButtonEnabled ? "" : "opacity-50 cursor-not-allowed"
                                    }`}
                                onClick={handleNextClick}
                                disabled={!isNextButtonEnabled}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <PhysicalDetailsForm setShowPhysicalForm={setShowPhysicalForm} 
                      ids={ids}
                      setIds={setIds}
                />
            )}
        </div>
    );
}

export default ContactDetailsForm;
