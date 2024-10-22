import React, { useState } from 'react';
import ToDo from "../../../../Assets/HrTas/ToDoList.svg";
import AddBtn from "../../../../Assets/HrTas/add.svg";
import TodoArrow from "../../../../Assets/HrTas/ToDoArrow.svg";
import Unchecked from "../../../../Assets/HrTas/uncheckBox.svg";
import Checked from "../../../../Assets/HrTas/checkBox.svg";
import CloseBtn from "../../../../Assets/HrTas/close.svg";
import DeleteBtn from "../../../../Assets/HrTas/delete.svg";
import "./ToDoList.css"


const Modal = ({ isOpen, closeModal, addTask }) => {
    const [newTask, setNewTask] = useState('');

    const handleSubmit = () => {
        if (newTask.trim() !== '') {
            addTask(newTask);  
            setNewTask('');    
            closeModal();     
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-[57%] flex justify-center items-center">
                <div className="bg-white p-6  w-[504px]">
                    <div className='flex items-center justify-between'>
                        <h2 className="text-[16px] font-medium">Add To-Do List</h2>
                        <img
                            onClick={closeModal}
                            src={CloseBtn} alt="" />
                    </div>

                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Enter To-Do Task"
                        className="border px-6 py-2 w-full mt-6 h-[88px] placeholder:mt-2"
                    />
                    <div className="flex justify-end mt-8">
                        <button
                            onClick={closeModal}
                            className="bg-[#ffffff] text-[#2C2B2B] border px-4 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="bg-[#6C55B2] ml-4 text-white px-4 py-2 rounded-lg"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

function ToDoListPage() {
    const [checkedTasks, setCheckedTasks] = useState([]); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [tasks, setTasks] = useState([]); 


    const handleCheckToggle = (index) => {
        setCheckedTasks((prevCheckedTasks) => {
            if (prevCheckedTasks.includes(index)) {
                return prevCheckedTasks.filter(taskIndex => taskIndex !== index); 
            } else {
                return [...prevCheckedTasks, index]; 
            }
        });
    };

    
    const deleteCheckedTasks = () => {
        setTasks((prevTasks) => {
            return prevTasks.filter((_, index) => !checkedTasks.includes(index)); 
        });
        setCheckedTasks([]);
    };

    const handleCreateTask = () => {
        setIsModalOpen(true); 
    };

    const closeModal = () => {
        setIsModalOpen(false); 
    };

    const addTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]); 
    };

    return (
        <div>
            <div className='flex justify-between '>
                <div className='flex items-center justify-start '>
                    <img className='w-5 h-5' src={ToDo} alt="Notification" />
                    <h1 className='text-[20px] font-medium text-[#1255D0] ml-1'>To-Do List</h1>
                </div>
                <div className='flex'>
             
                    <button
                        onClick={deleteCheckedTasks}
                        className='border text-[12px] font-normal flex items-center px-4 py-2 rounded-lg'
                    >
                        <img className='w-4 h-4 mr-1' src={DeleteBtn} alt="" />Delete
                    </button>
                
                    <button
                        onClick={handleCreateTask}
                        className='border text-[12px] font-normal flex items-center px-4 py-2 rounded-lg ml-2'
                    >
                        <img className='w-4 h-4 mr-1' src={AddBtn} alt="" /> Create New
                    </button>
                </div>
            </div>

       
            {tasks.length > 0 && (
                <div className='max-h-[224px] overflow-y-auto custom-scrollbar mr-6 mt-[20px] '>
                    {tasks.map((task, index) => (
                        <div key={index} className='bg-[#F6F6F8] h-[50px] rounded-lg mt-[20px] '>
                            <div className='flex items-center py-4 pl-4 pr-6'>
                                <img src={TodoArrow} alt="" />
                                <h1 className='ml-4 text-[14px] font-medium text-[#9819B0]'>{task}</h1>
                                <img
                                    className='ml-auto cursor-pointer'
                                    src={checkedTasks.includes(index) ? Checked : Unchecked}
                                    alt="Checkbox"
                                    onClick={() => handleCheckToggle(index)} 
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

        
            <Modal isOpen={isModalOpen} closeModal={closeModal} addTask={addTask} />
        </div>
    );
}

export default ToDoListPage;
