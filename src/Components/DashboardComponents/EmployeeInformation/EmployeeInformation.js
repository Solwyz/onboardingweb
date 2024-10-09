import React, { useState } from 'react';
import EmployeeInformationDetailed from '../EmployeeInformationDetailed/EmployeeInformationDetailed';

function EmployeeInformation() {
  const [showWhitePage, setShowWhitePage] = useState(false);

  const handleAddEmployeeClick = () => {
    setShowWhitePage(true);
  };

  return (
    <div className='h-full w-full'>
      {!showWhitePage ? (
        <button
          className='border p-3 rounded-lg bg-blue-900 text-white font-medium hover:bg-blue-700 duration-1000 flex justify-end'
          onClick={handleAddEmployeeClick}
        >
          + Add Employee
        </button>
      ) : (
        <EmployeeInformationDetailed />
      )}
    </div>
  );
}

export default EmployeeInformation;
