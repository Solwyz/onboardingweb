import React, { useState } from 'react';
import Department from './Department';  // Assuming it's the path for Department component
import DepartmentList from './DepartmentList';  // Assuming it's the path for DepartmentList component

function DepartmentManagement() {
  const [departments, setDepartments] = useState([]);

  // Function to add a new department to the list
  const addDepartment = (newDepartment) => {
    setDepartments((prevDepartments) => [...prevDepartments, newDepartment]);
  };

  return (
    <div>
      <Department onAddDepartment={addDepartment} />
      <DepartmentList departmentData={departments} />
    </div>
  );
}

export default DepartmentManagement;
