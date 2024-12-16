import React, { useState, useRef, useEffect } from 'react';
import "./TeamPlanner.css";
import DropDownArrow from "../../../Assets/Superadmin/Team Planner/dropDownArrow-downFace.svg";
import DropUpArrow from "../../../Assets/Superadmin/Team Planner/dropDownArrow-UpFace.svg";
import DummyImg from "../../../Assets/Superadmin/Team Planner/dummy img.png";
import ScaleUp from "../../../Assets/Superadmin/Team Planner/scale-up.svg";
import Edit from "../../../Assets/Superadmin/Team Planner/Edit-pencil.svg";
import TeamData from '../TeamPlaner/TeamData.json';

const TeamMembers = () => {
  const [expanded, setExpanded] = useState(null);
  const [nestedExpanded, setNestedExpanded] = useState({});
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setExpanded(null); // Close the main dropdown
        setNestedExpanded({}); // Close all nested dropdowns
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = (section) => {
    setExpanded(expanded === section ? null : section);
  };

  const handleNestedToggle = (subsection) => {
    setNestedExpanded((prevState) => ({
      ...prevState,
      [subsection]: !prevState[subsection],
    }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-[16px] font-normal mb-4">Team Members</h1>

      <div className="space-y-4" ref={dropdownRef}>
        {TeamData.map((section) => (
          <div key={section.name}>
            <div
              className="flex justify-between items-center cursor-pointer p-4 bg-white shadow-md"
              onClick={() => handleToggle(section.name)}
            >
              <div className="flex gap-[14px]">
                <img
                  src={expanded === section.name ? DropUpArrow : DropDownArrow}
                  alt="Toggle Arrow"
                />
                <span className="font-medium text-[14px]">{section.name}</span>
              </div>
              <div>
                <span className="text-[#442995] text-[14px] font-light">
                  {section.employees} Employees
                </span>
              </div>
            </div>

            {expanded === section.name && (
              <div className="pl-6 mt-2 space-y-3">
                {section.subsections.map((subsection) => (
                  <div className='hanging-line hanging-line-end' key={subsection.name}>
                    <div
                      className="flex  justify-between items-center cursor-pointer p-3 bg-white shadow-md"
                      onClick={() => handleNestedToggle(subsection.name)}
                    >
                      <div className="flex gap-2">
                        <img
                          src={nestedExpanded[subsection.name] ? DropUpArrow : DropDownArrow}
                          alt=""
                        />
                        <span className="font-light text-[14px]">{subsection.name}</span>
                      </div>
                      <div><span className="text-[#442995] text-[14px] font-light">{subsection.employees} Employees</span></div>
                    </div>

                    {/* Ensure teamMembers is defined and an array */}
                    {nestedExpanded[subsection.name] && Array.isArray(subsection.teamMembers) && subsection.teamMembers.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pl-4 lg:grid-cols-4 gap-4 mt-2">
                        {subsection.teamMembers.map((member, index) => (
                          <div key={index} className="p-4 bg-white rounded-lg shadow-md flex flex-col">
                            <div className='flex items-center'>
                              <img
                                src={member.image || DummyImg}
                                alt="Profile"
                                className="rounded-lg w-16 h-16 mr-2"
                              />
                              <div>
                                <h3 className="font-light text-[14px] text-[#626DAF]">{member.name}</h3>
                                <p className="text-[12px] text-[#696A70]">{member.email}</p>
                              </div>
                              <div className='w-fit ml-auto'>
                                <img className='w-6 h-6 translate-y-[-22px]' src={Edit} alt="Edit" />
                              </div>
                            </div>
                            <div className='flex mt-2'>
                              <img className='mr-2' src={ScaleUp} alt="Experience" />
                              <p className="text-sm text-[#626DAF]">{member.experience}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
