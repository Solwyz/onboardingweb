import React, { createContext, useState } from 'react'
import BasicDetailsForm from './EmployeeAddForms/BasicDetailsForm';

export const employeeContext = createContext();

export default function Employee() {

    const [showBasicForm, setShowBasicForm] = useState(false)
    

    const handeleAddEmployeeClick = () => {
        setShowBasicForm(true)
    }

    return (
        <employeeContext.Provider value={{ showBasicForm, setShowBasicForm }}>
            <div>
            {!showBasicForm ? 
                <div className='bg-yellow-50 px-6 py-8'>
                    <div className='flex justify-between'>
                        <div>All employees</div>
                        <div><button className='border p-3 rounded-lg bg-blue-900 text-white font-medium hover:bg-blue-700 duration-1000'
                            onClick={handeleAddEmployeeClick}>Add Employee</button></div>
                    </div>
                </div>
                : <BasicDetailsForm/> 
            }
            </div>
        </employeeContext.Provider>
    )
}
